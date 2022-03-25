import prismaClient from "../../../config/prismaClient";

export type Registration = "DTI" | "SEC" | "CDA";
export type Organization = "sole proprietorship" | "partnership" | "corporation" | "cooperative";
export type BusinessActivity = "main office" | "branch" | "single establishment" | "establishment and main office";

export interface AddressInterface {
    bldgNumber: string;
    street: string;
    barangay: string;
    city: string;
    province: string;
    postalCode: number;
    latitude: number | null;
    longitude: number | null;
    mainOffice: boolean;
}

export const RegisterFormKeys = ['registrationNumber', 'TIN', 'businessName', 'tradeName', 'telephone', 'mobile', 'email', 'website', 'orgType', 'quarterPayment',
                        'filipinoEmployees', 'foreignEmployees', 'businessArea', 'totalFloors', 'maleEmployees', 'femaleEmployees', 'totalEmployees', 'lguEmployees',
                        'deliveryUnits', 'activity', 'capital', 'taxIncentive', 'rented', 'mainOffice', 'businessAddress', 'owner', 'partners', 'services', 'files'];

export interface RegisterFormInterface {
    registrationNumber: string;
    TIN: string;
    businessName: string;
    tradeName: string;
    telephone: string;
    mobile: string;
    email: string;
    website: string | null;
    orgType: Organization;
    filipinoEmployees: number;
    foreignEmployees: number;
    businessArea: number;
    totalFloors: number;
    maleEmployees: number;
    femaleEmployees: number;
    totalEmployees: number;
    lguEmployees: number;
    deliveryUnits: number;
    activity: BusinessActivity;
    capital: number;
    taxIncentive: boolean;
    rented: boolean;
    mainOffice: AddressInterface;
    businessAddress: AddressInterface;
    owner: OwnerInterface;
    quarterPayment: boolean;
    partners: OwnerInterface[];
    services: ServicesInterface[];
    files: FormFilesInterface[];
}

export interface OwnerInterface {
    surname: string;
    givenName: string;
    middleName: string;
    suffix: string | null;
    owner: boolean;
    citizenship: string | null;
    gender: "male" | "female";
    address?: AddressInterface;
}

export interface FormFilesInterface {
    fileURL: string;
    fileName: string;
    documentType: string;
}

export interface ServicesInterface {
    productService: string;
    psicCode: string | null;
    businessTypeId: number;
}

class RegisterModel {

    async saveRegistrationForm(formData: RegisterFormInterface, userId: number) {

        const registeredBusiness = await prismaClient.businessRegistry.create({
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
            const ownerAddress = await prismaClient.businessAdresses.create({
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

            await prismaClient.businessOwners.create({
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
        }))

        await prismaClient.businessOwners.createMany({
            data: partners
        })

        return registeredBusiness.businessId;
    }

    async getRegistrationForm(registrationId: number) {
        const registrationForm = await prismaClient.businessRegistry.findUnique({
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
    }

    async updateRegistrationForm(registrationId: number, updatedForm: RegisterFormInterface, userId: number) {
        await prismaClient.businessRegistry.delete({
            where: {
                businessId: registrationId,
            }
        });

        await this.saveRegistrationForm(updatedForm, userId);
    }
    
    async archiveRegistrationForm(registrationId: number) {
        await prismaClient.businessRegistry.update({
            where: {
                businessId: registrationId,
            },
            data: {
                archived: true
            }
        })
    }

    async restoreRegistrationForm(registrationId: number) {
        await prismaClient.businessRegistry.update({
            where: {
                businessId: registrationId,
            },
            data: {
                archived: false
            }
        })
    }

    async getUserApplications(userId: number) {
        const userApplications = await prismaClient.businessRegistry.findMany({
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
                        remarks: true,
                        official: {
                            select: {
                                firstName: true,
                                lastName: true
                            }
                        }
                    }
                }
            }
        })

        return userApplications;
    } 
}


export default RegisterModel;