import prismaClient from "../../../config/prismaClient";
import { noCase } from 'change-case';

class ZoneModel {

    async createZoneClassification(code: string, base: string) {
        const newZoneClass = await prismaClient.zoneClassification.create({
            data: {
                zoneCode: code,
                zoneBase: base
            }
        })

        return newZoneClass;
    }

    async getZoneClassifications() {
        const zoneClasses = await prismaClient.zoneClassification.findMany();
        return zoneClasses;
    }

    async createZoneOverlay(code: string, base: string) {
        const newZoneOverlay = await prismaClient.zoneOverlay.create({
            data: {
                overlayCode: code,
                overlayBase: base
            }
        })

        return newZoneOverlay;
    }

    async createBusinessTypes(type: string, zone: number) {
        const newBusinessType = await prismaClient.businessTypes.create({
            data: {
                typeName: type,
                zoneId: zone
            }
        })

        return newBusinessType;
    }

    async getBusinessTypes() {
        const businessTypes = await prismaClient.businessTypes.findMany();

        return businessTypes;
    }

    async getUniqieBusinessType(zoneId: number, type: string) {
        const business = await prismaClient.businessTypes.findFirst({
            where: {
                AND: {
                    typeName: type,
                    zoneId: zoneId
                }
            }
        })

        return business;
    }

    async createZoneBoundary(zone: number, overlay: number, street: string, barangay: string) {
        const newZoneBoundary = await prismaClient.zoneBounderies.create({
            data: {
                street: noCase(street),
                barangay: noCase(barangay),
                zoneId: zone,
                overlayId: overlay
            }
        })

        return newZoneBoundary;
    }

    async getZoneBoundary(street: string, barangay: string) {
        const zoneBoundary = await prismaClient.zoneBounderies.findFirst({
            where: {
                AND: {
                    street: noCase(street),
                    barangay: noCase(barangay)
                }
            }
        })

        return zoneBoundary;
    }

    async getZoneClassByCode(code: string) {
        const zoneClass = await prismaClient.zoneClassification.findUnique({
            where: {
                zoneCode: code
            }
        })

        return zoneClass;
    }

    async getZoneByLocation(street: string, barangay: string) {
        const streetDetails: string[] = street.split(' ')

        const zoneBoundary = await prismaClient.zoneBounderies.findMany({
            where: {
                street: {
                    contains: noCase(streetDetails[1])
                }
            },
            include: {
                zone: true,
                zoneOverlay: true
            }
        })

        return zoneBoundary;
    } 

    async getBusinessTypesByZone(zone?: number[]) {
        const businessTypes = await prismaClient.businessTypes.findMany({
            where: {
                zoneId: { in: zone }
            }
        })

        return businessTypes;
    }

    async getAllBusinessTypes(zone: number[]) {
        const businessTypes = await prismaClient.businessTypes.findMany({
            where: {
                NOT: {
                    zoneId: { in: zone }
                }
            }
        })

        return businessTypes;
    }
}

export default ZoneModel;