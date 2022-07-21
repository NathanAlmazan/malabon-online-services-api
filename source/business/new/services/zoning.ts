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
            const ids = zoneBoundary.map(z => z.zoneId);

            if (zoneBoundary.length === 0) {
                const businessTypes = await zoneModel.getBusinessTypesByZone();

                return res.status(200).json({
                    zone: null,
                    overlay: null,
                    businessTypes: businessTypes
                });
            }

            const businessTypes = await zoneModel.getBusinessTypesByZone(ids);
            const allBusinessTypes = await zoneModel.getAllBusinessTypes(ids);

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
                zone: zoneBoundary[0].zone,
                overlay: zoneBoundary[0].zoneOverlay,
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

    async getZoneClassifications(req: Request, res: Response, next: NextFunction) {
        try {
            const classifications = await zoneModel.getZoneClassifications();
            return res.status(200).json(classifications);
        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

    async createZoneClassification(req: Request, res: Response, next: NextFunction) {
        const code: string | undefined = req.body.code;
        const base: string | undefined = req.body.base;
        
        if (!code || !base) {
            const nullArgumentError = new GlobalErrors.NullArgumentError("Incomplete arguments.");
            return next(nullArgumentError);
        }

        try {
            const newClassification = await zoneModel.createZoneClassification(code, base);

            return res.status(201).json(newClassification);
        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

    async createZoneBoundary(req: Request, res: Response, next: NextFunction) {
        const zoneId: number | undefined = req.body.zoneId;
        const street: string | undefined = req.body.street;
        const barangay: string | undefined = req.body.barangay;

        if (!street || !barangay || !zoneId) {
            const nullArgumentError = new GlobalErrors.NullArgumentError("Incomplete arguments.");
            return next(nullArgumentError);
        }

        try {
            const zone = await zoneModel.getZoneBoundary(street, barangay);

            if (zone) {
                const recordExists = new GlobalErrors.NullArgumentError("Record already exists.");
                return next(recordExists);
            }

            const newBoundary = await zoneModel.createZoneBoundary(zoneId, 1, street, barangay);

            return res.status(201).json(newBoundary);
        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

    async getBusinessTypes(req: Request, res: Response, next: NextFunction) {
        try {
            const businesses = await zoneModel.getBusinessTypes();

            return res.status(200).json(businesses);
        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

    async createBusinessTypes(req: Request, res: Response, next: NextFunction) {
        const type: string | undefined = req.body.type;
        const zoneId: number | undefined = req.body.zoneId;

        if (!type || !zoneId) {
            const nullArgumentError = new GlobalErrors.NullArgumentError("Incomplete arguments.");
            return next(nullArgumentError);
        }

        try {
            const zone = await zoneModel.getUniqieBusinessType(zoneId, type);

            if (zone) {
                const recordExists = new GlobalErrors.NullArgumentError("Record already exists.");
                return next(recordExists);
            }

            const newZone = await zoneModel.createBusinessTypes(type, zoneId);

            return res.status(201).json(newZone);
        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }
}

export default Zoning;