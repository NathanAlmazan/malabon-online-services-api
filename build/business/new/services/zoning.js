"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globalErrors_1 = __importDefault(require("../../../globalErrors"));
const businessOverlays_1 = __importDefault(require("../InitialData/businessOverlays"));
const businessTypes_1 = __importDefault(require("../InitialData/businessTypes"));
const zoneClassifications_1 = __importDefault(require("../InitialData/zoneClassifications"));
const zoningBounderies_1 = __importDefault(require("../InitialData/zoningBounderies"));
const zoneModel_1 = __importDefault(require("../models/zoneModel"));
const zoneModel = new zoneModel_1.default();
class Zoning {
    getZoneClassByLocation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const street = req.body.street;
            const barangay = req.body.barangay;
            if (!street || !barangay) {
                const nullArgumentError = new globalErrors_1.default.NullArgumentError("Incomplete arguments.");
                return next(nullArgumentError);
            }
            try {
                const zoneBoundary = yield zoneModel.getZoneByLocation(street, barangay);
                const ids = zoneBoundary.map(z => z.zoneId);
                if (zoneBoundary.length === 0) {
                    const businessTypes = yield zoneModel.getBusinessTypesByZone();
                    return res.status(200).json({
                        zone: null,
                        overlay: null,
                        businessTypes: businessTypes
                    });
                }
                const businessTypes = yield zoneModel.getBusinessTypesByZone(ids);
                const allBusinessTypes = yield zoneModel.getAllBusinessTypes(ids);
                let finalBusinessTypes = [];
                businessTypes.forEach(businessType => {
                    const finalType = businessType;
                    finalType.approved = true;
                    finalBusinessTypes.push(finalType);
                });
                allBusinessTypes.forEach(businessType => {
                    const finalType = businessType;
                    finalType.approved = false;
                    if (!finalBusinessTypes.find(businessType => businessType.typeName == finalType.typeName)) {
                        finalBusinessTypes.push(finalType);
                    }
                });
                return res.status(200).json({
                    zone: zoneBoundary[0].zone,
                    overlay: zoneBoundary[0].zoneOverlay,
                    businessTypes: finalBusinessTypes
                });
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
    initializeRecord(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                for (let x = 0; x < zoneClassifications_1.default.length; x++) {
                    yield zoneModel.createZoneClassification(zoneClassifications_1.default[x].Code, zoneClassifications_1.default[x]["Base Zone"]);
                }
                for (let x = 0; x < businessOverlays_1.default.length; x++) {
                    yield zoneModel.createZoneOverlay(businessOverlays_1.default[x].Code, businessOverlays_1.default[x].Overlay);
                }
                for (let x = 0; x < businessTypes_1.default.length; x++) {
                    const zoneClass = yield zoneModel.getZoneClassByCode(businessTypes_1.default[x].Zone);
                    if (zoneClass) {
                        yield zoneModel.createBusinessTypes(businessTypes_1.default[x].Business, zoneClass.zoneId);
                    }
                }
                for (let x = 0; x < zoningBounderies_1.default.length; x++) {
                    const zoneClass = yield zoneModel.getZoneClassByCode(zoningBounderies_1.default[x]["ZONE CODE"]);
                    if (zoneClass) {
                        yield zoneModel.createZoneBoundary(zoneClass.zoneId, 1, zoningBounderies_1.default[x].STREET, zoningBounderies_1.default[x].BARANGAY);
                    }
                }
                return res.status(201).json({ message: "Initialized database successfully." });
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
    getZoneClassifications(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const classifications = yield zoneModel.getZoneClassifications();
                return res.status(200).json(classifications);
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
    createZoneClassification(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const code = req.body.code;
            const base = req.body.base;
            if (!code || !base) {
                const nullArgumentError = new globalErrors_1.default.NullArgumentError("Incomplete arguments.");
                return next(nullArgumentError);
            }
            try {
                const newClassification = yield zoneModel.createZoneClassification(code, base);
                return res.status(201).json(newClassification);
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
    createZoneBoundary(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const zoneId = req.body.zoneId;
            const street = req.body.street;
            const barangay = req.body.barangay;
            if (!street || !barangay || !zoneId) {
                const nullArgumentError = new globalErrors_1.default.NullArgumentError("Incomplete arguments.");
                return next(nullArgumentError);
            }
            try {
                const zone = yield zoneModel.getZoneBoundary(street, barangay);
                if (zone) {
                    const recordExists = new globalErrors_1.default.NullArgumentError("Record already exists.");
                    return next(recordExists);
                }
                const newBoundary = yield zoneModel.createZoneBoundary(zoneId, 1, street, barangay);
                return res.status(201).json(newBoundary);
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
    getBusinessTypes(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const businesses = yield zoneModel.getBusinessTypes();
                return res.status(200).json(businesses);
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
    createBusinessTypes(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const type = req.body.type;
            const zoneId = req.body.zoneId;
            if (!type || !zoneId) {
                const nullArgumentError = new globalErrors_1.default.NullArgumentError("Incomplete arguments.");
                return next(nullArgumentError);
            }
            try {
                const zone = yield zoneModel.getUniqieBusinessType(zoneId, type);
                if (zone) {
                    const recordExists = new globalErrors_1.default.NullArgumentError("Record already exists.");
                    return next(recordExists);
                }
                const newZone = yield zoneModel.createBusinessTypes(type, zoneId);
                return res.status(201).json(newZone);
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
}
exports.default = Zoning;
//# sourceMappingURL=zoning.js.map