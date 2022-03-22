import prismaClient from "../../config/prismaClient";
import { BuildingPayments } from "@prisma/client"

export type FormFiles = {
    fileName: string;
    fileURL: string;
    documentType: string;
}

export type BuildingPermitType = {
    totalFloorArea: number;
    estimatedCost: number;
    proposedDate: Date;
    dateOfCompletion: Date;
    occupancyClassified: string;
    numberOfUnits: number;
    surname: string;
    givenName: string;
    middleName: string;
    suffix: string | null;
    gender: string;
    citizenship: string | null;
    bldgNumber: string;
    street: string;
    barangay: string;
    city: string;
    province: string;
    postalCode: number;
    scopeOfWork: string;
    buildingUse: string;
    engineer: string;
    latitude: number | null;
    longitude: number | null;
    quarterPayment?: boolean;
    files: FormFiles[];
}



class Buildingregister {
    async registerNewBuilding(buildingInfo: BuildingPermitType, userId: number) {
        const saveFiles = buildingInfo.files.map(file => ({
            fileName: file.fileName,
            documentType: file.documentType,
            fileURL: file.fileURL
        }))

        const newBuilding = await prismaClient.buildingPermit.create({
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
        })

        return newBuilding;
    }

    async getBuildingForm(buildingId: number) {
        const buildingForm = await prismaClient.buildingPermit.findUnique({
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
        })

        return buildingForm;
    }
}

export default Buildingregister;