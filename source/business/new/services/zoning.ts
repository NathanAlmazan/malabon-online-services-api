import { NextFunction, Request, Response } from "express";
import GlobalErrors from "../../../globalErrors";
import overlays from "../InitialData/businessOverlays";
import businessTypes from "../InitialData/businessTypes";
import zones from "../InitialData/zoneClassifications";
import boundaries from "../InitialData/zoningBounderies";
import ZoneModel from "../models/zoneModel";
import { BusinessTypes } from "@prisma/client";

interface AllBusinessTypes extends BusinessTypes {
    approved?: boolean;
}

const zoneModel = new ZoneModel();

class Zoning {

    async getZoneClassByLocation(req: Request, res: Response, next: NextFunction) {
        const street: string| undefined = req.body.street;
        const barangay: string| undefined = req.body.barangay;

        if (!street || !barangay) {
            const nullArgumentError = new GlobalErrors.NullArgumentError("Incomplete arguments.");
            return next(nullArgumentError);
        }

        try {
            const zoneBoundary = await zoneModel.getZoneByLocation(street, barangay);

            if (!zoneBoundary) {
                const businessTypes = await zoneModel.getBusinessTypesByZone();

                return res.status(200).json({
                    zone: null,
                    overlay: null,
                    businessTypes: businessTypes
                });
            }

            const businessTypes = await zoneModel.getBusinessTypesByZone(zoneBoundary.zoneId);
            const allBusinessTypes = await zoneModel.getAllBusinessTypes(zoneBoundary.zoneId);

            let finalBusinessTypes: AllBusinessTypes[] = [];

            businessTypes.forEach(businessType => {
                const finalType: AllBusinessTypes = businessType;
                finalType.approved = true;

                finalBusinessTypes.push(finalType);
            })

            allBusinessTypes.forEach(businessType => {
                const finalType: AllBusinessTypes = businessType;
                finalType.approved = false;

                if (!finalBusinessTypes.find(businessType => businessType.typeName == finalType.typeName)) {
                    finalBusinessTypes.push(finalType);
                }
            })

            return res.status(200).json({
                zone: zoneBoundary.zone,
                overlay: zoneBoundary.zoneOverlay,
                businessTypes: finalBusinessTypes
            });

        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

    async initializeRecord(req: Request, res: Response, next: NextFunction) {
        try {

            for (let x = 0; x < zones.length; x++) {
                await zoneModel.createZoneClassification(zones[x].Code, zones[x]["Base Zone"]);
            }

            for (let x = 0; x < overlays.length; x++) {
                await zoneModel.createZoneOverlay(overlays[x].Code, overlays[x].Overlay);
            }

            for (let x = 0; x < businessTypes.length; x++) {
                const zoneClass = await zoneModel.getZoneClassByCode(businessTypes[x].Zone);
                if (zoneClass) {
                    await zoneModel.createBusinessTypes(businessTypes[x].Business, zoneClass.zoneId);
                }
            }

            for (let x = 0; x < boundaries.length; x++) {
                const zoneClass = await zoneModel.getZoneClassByCode(boundaries[x]["ZONE CODE"]);
                if (zoneClass) {
                    await zoneModel.createZoneBoundary(zoneClass.zoneId, 1, boundaries[x].STREET, boundaries[x].BARANGAY);
                }
            }

            return res.status(201).json({ message: "Initialized database successfully." })

        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

}

export default Zoning;