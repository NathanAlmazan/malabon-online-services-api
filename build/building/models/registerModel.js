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
const prismaClient_1 = __importDefault(require("../../config/prismaClient"));
class Buildingregister {
    registerNewBuilding(buildingInfo, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const saveFiles = buildingInfo.files.map(file => ({
                fileName: file.fileName,
                documentType: file.documentType,
                fileURL: file.fileURL
            }));
            const newBuilding = yield prismaClient_1.default.buildingPermit.create({
                data: {
                    totalFloorArea: buildingInfo.totalFloorArea,
                    estimatedCost: buildingInfo.estimatedCost,
                    proposedDate: new Date(buildingInfo.proposedDate),
                    dateOfCompletion: new Date(buildingInfo.dateOfCompletion),
                    occupancyClassified: buildingInfo.occupancyClassified,
                    numberOfUnits: buildingInfo.numberOfUnits,
                    surname: buildingInfo.surname,
                    givenName: buildingInfo.givenName,
                    middleName: buildingInfo.middleName,
                    suffix: buildingInfo.suffix,
                    gender: buildingInfo.gender,
                    citizenship: buildingInfo.citizenship,
                    bldgNumber: buildingInfo.bldgNumber,
                    street: buildingInfo.street,
                    barangay: buildingInfo.barangay,
                    city: buildingInfo.city,
                    province: buildingInfo.province,
                    postalCode: buildingInfo.postalCode,
                    scopeOfWork: buildingInfo.scopeOfWork,
                    buildingUse: buildingInfo.buildingUse,
                    engineer: buildingInfo.engineer,
                    latitude: buildingInfo.latitude,
                    longitude: buildingInfo.longitude,
                    userId: userId,
                    quarterPayment: buildingInfo.quarterPayment,
                    files: {
                        createMany: {
                            data: saveFiles
                        }
                    }
                }
            });
            return newBuilding;
        });
    }
    getBuildingForm(buildingId) {
        return __awaiter(this, void 0, void 0, function* () {
            const buildingForm = yield prismaClient_1.default.buildingPermit.findUnique({
                where: {
                    buildingId: buildingId
                },
                include: {
                    approvals: {
                        select: {
                            approvalFee: true,
                            approvalId: true,
                            approvalType: true,
                            approved: true,
                            approvedAt: true,
                            remarks: true,
                            required: true,
                            official: {
                                select: {
                                    firstName: true,
                                    lastName: true
                                }
                            },
                        }
                    },
                    files: true,
                    payments: true,
                    userAccount: true
                }
            });
            return buildingForm;
        });
    }
    getUserForms(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userForms = yield prismaClient_1.default.buildingPermit.findMany({
                where: {
                    userId: userId
                },
                include: {
                    approvals: {
                        select: {
                            approvalFee: true,
                            approvalId: true,
                            approvalType: true,
                            approved: true,
                            approvedAt: true,
                            remarks: true,
                            required: true,
                            official: {
                                select: {
                                    firstName: true,
                                    lastName: true
                                }
                            },
                        }
                    },
                    files: true,
                    payments: true,
                    userAccount: true
                }
            });
            return userForms;
        });
    }
}
exports.default = Buildingregister;
//# sourceMappingURL=registerModel.js.map