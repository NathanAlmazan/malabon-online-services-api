import { NextFunction, Request, Response } from "express";
import GlobalErrors from "../../../globalErrors";
import overlays from "../InitialData/businessOverlays";
import businessTypes from "../InitialData/businessTypes";
import zones from "../InitialData/zoneClassifications";
import boundaries from "../InitialData/zoningBounderies";
import ZoneModel from "../models/zoneModel";

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
                const notFoundError = new GlobalErrors.NotFoundError("Cannot classify location.");
                return next(notFoundError);
            }

            const businessTypes = await zoneModel.getBusinessTypesByZone(zoneBoundary.zoneId);

            return res.status(200).json({
                zone: zoneBoundary.zone,
                overlay: zoneBoundary.zoneOverlay,
                businessTypes: businessTypes
            });

        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

    async initializeRecord(req: Request, res: Response, next: NextFunction) {
        try {

            zones.forEach(async (zone) => await zoneModel.createZoneClassification(zone.Code, zone["Base Zone"]));
            overlays.forEach(async (overlay) => await zoneModel.createZoneOverlay(overlay.Code, overlay.Overlay));
            businessTypes.forEach(async (type) => {
                const zoneClass = await zoneModel.getZoneClassByCode(type.Zone);
                if (zoneClass) {
                    await zoneModel.createBusinessTypes(type.Business, zoneClass.zoneId);
                }
            });
            boundaries.forEach(async (boundary) => {
                const zoneClass = await zoneModel.getZoneClassByCode(boundary["ZONE CODE"]);
                if (zoneClass) {
                    await zoneModel.createZoneBoundary(zoneClass.zoneId, 1, boundary.STREET, boundary.BARANGAY);
                }
            })

            return res.status(201).json({ message: "Initialized database successfully." })

        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

}

export default Zoning;