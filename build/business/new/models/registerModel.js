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
exports.RegisterFormKeys = void 0;
const prismaClient_1 = __importDefault(require("../../../config/prismaClient"));
exports.RegisterFormKeys = ['registrationNumber', 'TIN', 'businessName', 'tradeName', 'telephone', 'mobile', 'email', 'website', 'orgType', 'quarterPayment',
    'filipinoEmployees', 'foreignEmployees', 'businessArea', 'totalFloors', 'maleEmployees', 'femaleEmployees', 'totalEmployees', 'lguEmployees',
    'deliveryUnits', 'activity', 'capital', 'taxIncentive', 'rented', 'mainOffice', 'businessAddress', 'owner', 'partners', 'services', 'files'];
class RegisterModel {
    saveRegistrationForm(formData, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const registeredBusiness = yield prismaClient_1.default.businessRegistry.create({
                data: {
                    registrationNumber: formData.registrationNumber,
                    TIN: formData.TIN,
                    businessName: formData.businessName,
                    tradeName: formData.tradeName,
                    telephone: formData.telephone,
                    mobile: formData.mobile,
                    email: formData.email,
                    website: formData.website,
                    orgType: formData.orgType,
                    filipinoEmployees: formData.filipinoEmployees,
                    foreignEmployees: formData.foreignEmployees,
                    businessArea: formData.businessArea,
                    totalFloors: formData.totalFloors,
                    maleEmployees: formData.maleEmployees,
                    femaleEmployees: formData.femaleEmployees,
                    totalEmployees: formData.totalEmployees,
                    lguEmployees: formData.lguEmployees,
                    deliveryUnits: formData.deliveryUnits,
                    activity: formData.activity,
                    capital: formData.capital,
                    taxIncentive: formData.taxIncentive,
                    rented: formData.rented,
                    quarterPayment: formData.quarterPayment,
                    userId: userId,
                    files: {
                        createMany: {
                            data: formData.files,
                        }
                    },
                    addresses: {
                        createMany: {
                            data: [
                                formData.businessAddress,
                                formData.mainOffice
                            ]
                        }
                    },
                    services: {
                        createMany: {
                            data: formData.services
                        }
                    }
                },
                select: {
                    businessId: true
                }
            });
            if (formData.owner.address) {
                const ownerAddress = yield prismaClient_1.default.businessAdresses.create({
                    data: {
                        bldgNumber: formData.owner.address.bldgNumber,
                        street: formData.owner.address.street,
                        barangay: formData.owner.address.barangay,
                        city: formData.owner.address.city,
                        province: formData.owner.address.province,
                        postalCode: formData.owner.address.postalCode,
                        businessId: registeredBusiness.businessId
                    },
                    select: {
                        addressId: true
                    }
                });
                yield prismaClient_1.default.businessOwners.create({
                    data: {
                        surname: formData.owner.surname,
                        middleName: formData.owner.middleName,
                        givenName: formData.owner.givenName,
                        suffix: formData.owner.suffix,
                        gender: formData.owner.gender,
                        citizenship: formData.owner.citizenship,
                        businessId: registeredBusiness.businessId,
                        owner: true,
                        addressId: ownerAddress.addressId
                    }
                });
            }
            const partners = formData.partners.map(partner => ({
                surname: partner.surname,
                middleName: partner.middleName,
                givenName: partner.givenName,
                suffix: partner.suffix,
                gender: partner.gender,
                citizenship: partner.citizenship,
                businessId: registeredBusiness.businessId,
                owner: false
            }));
            yield prismaClient_1.default.businessOwners.createMany({
                data: partners
            });
            return registeredBusiness.businessId;
        });
    }
    getRegistrationForm(registrationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const registrationForm = yield prismaClient_1.default.businessRegistry.findUnique({
                where: {
                    businessId: registrationId
                },
                include: {
                    addresses: true,
                    files: true,
                    owners: true,
                    services: {
                        select: {
                            businessTypeId: true,
                            businessType: {
                                select: {
                                    typeName: true
                                }
                            },
                            productService: true,
                            psicCode: true
                        }
                    },
                    approvals: {
                        select: {
                            approvalFee: true,
                            approvalType: true,
                            approved: true,
                            required: true,
                            approvedAt: true,
                            remarks: true,
                            official: {
                                select: {
                                    firstName: true,
                                    lastName: true
                                }
                            }
                        }
                    },
                    payments: true,
                    userAccount: {
                        select: {
                            uid: true
                        }
                    },
                    appointment: true
                }
            });
            return registrationForm;
        });
    }
    updateRegistrationForm(registrationId, updatedForm, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prismaClient_1.default.businessRegistry.delete({
                where: {
                    businessId: registrationId,
                }
            });
            yield this.saveRegistrationForm(updatedForm, userId);
        });
    }
    archiveRegistrationForm(registrationId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prismaClient_1.default.businessRegistry.update({
                where: {
                    businessId: registrationId,
                },
                data: {
                    archived: true
                }
            });
        });
    }
    restoreRegistrationForm(registrationId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prismaClient_1.default.businessRegistry.update({
                where: {
                    businessId: registrationId,
                },
                data: {
                    archived: false
                }
            });
        });
    }
    getUserApplications(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userApplications = yield prismaClient_1.default.businessRegistry.findMany({
                where: {
                    AND: {
                        userId: userId
                    }
                },
                include: {
                    approvals: {
                        select: {
                            approvalFee: true,
                            approvalType: true,
                            approved: true,
                            required: true,
                            approvedAt: true,
                            official: {
                                select: {
                                    firstName: true,
                                    lastName: true
                                }
                            }
                        }
                    }
                }
            });
            return userApplications;
        });
    }
}
exports.default = RegisterModel;
//# sourceMappingURL=registerModel.js.map