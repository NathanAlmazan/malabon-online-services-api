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
const prismaClient_1 = __importDefault(require("../../../config/prismaClient"));
const change_case_1 = require("change-case");
class ZoneModel {
    createZoneClassification(code, base) {
        return __awaiter(this, void 0, void 0, function* () {
            const newZoneClass = yield prismaClient_1.default.zoneClassification.create({
                data: {
                    zoneCode: code,
                    zoneBase: base
                }
            });
            return newZoneClass;
        });
    }
    getZoneClassifications() {
        return __awaiter(this, void 0, void 0, function* () {
            const zoneClasses = yield prismaClient_1.default.zoneClassification.findMany();
            return zoneClasses;
        });
    }
    createZoneOverlay(code, base) {
        return __awaiter(this, void 0, void 0, function* () {
            const newZoneOverlay = yield prismaClient_1.default.zoneOverlay.create({
                data: {
                    overlayCode: code,
                    overlayBase: base
                }
            });
            return newZoneOverlay;
        });
    }
    createBusinessTypes(type, zone) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBusinessType = yield prismaClient_1.default.businessTypes.create({
                data: {
                    typeName: type,
                    zoneId: zone
                }
            });
            return newBusinessType;
        });
    }
    getBusinessTypes() {
        return __awaiter(this, void 0, void 0, function* () {
            const businessTypes = yield prismaClient_1.default.businessTypes.findMany();
            return businessTypes;
        });
    }
    getUniqieBusinessType(zoneId, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const business = yield prismaClient_1.default.businessTypes.findFirst({
                where: {
                    AND: {
                        typeName: type,
                        zoneId: zoneId
                    }
                }
            });
            return business;
        });
    }
    createZoneBoundary(zone, overlay, street, barangay) {
        return __awaiter(this, void 0, void 0, function* () {
            const newZoneBoundary = yield prismaClient_1.default.zoneBounderies.create({
                data: {
                    street: (0, change_case_1.noCase)(street),
                    barangay: (0, change_case_1.noCase)(barangay),
                    zoneId: zone,
                    overlayId: overlay
                }
            });
            return newZoneBoundary;
        });
    }
    getZoneBoundary(street, barangay) {
        return __awaiter(this, void 0, void 0, function* () {
            const zoneBoundary = yield prismaClient_1.default.zoneBounderies.findFirst({
                where: {
                    AND: {
                        street: (0, change_case_1.noCase)(street),
                        barangay: (0, change_case_1.noCase)(barangay)
                    }
                }
            });
            return zoneBoundary;
        });
    }
    getZoneClassByCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const zoneClass = yield prismaClient_1.default.zoneClassification.findUnique({
                where: {
                    zoneCode: code
                }
            });
            return zoneClass;
        });
    }
    getZoneByLocation(street, barangay) {
        return __awaiter(this, void 0, void 0, function* () {
            const streetDetails = street.split(' ');
            const zoneBoundary = yield prismaClient_1.default.zoneBounderies.findMany({
                where: {
                    street: {
                        contains: (0, change_case_1.noCase)(streetDetails[1])
                    }
                },
                include: {
                    zone: true,
                    zoneOverlay: true
                }
            });
            return zoneBoundary;
        });
    }
    getBusinessTypesByZone(zone) {
        return __awaiter(this, void 0, void 0, function* () {
            const businessTypes = yield prismaClient_1.default.businessTypes.findMany({
                where: {
                    zoneId: { in: zone }
                }
            });
            return businessTypes;
        });
    }
    getAllBusinessTypes(zone) {
        return __awaiter(this, void 0, void 0, function* () {
            const businessTypes = yield prismaClient_1.default.businessTypes.findMany({
                where: {
                    NOT: {
                        zoneId: { in: zone }
                    }
                }
            });
            return businessTypes;
        });
    }
}
exports.default = ZoneModel;
//# sourceMappingURL=zoneModel.js.map