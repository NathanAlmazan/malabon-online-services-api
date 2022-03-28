import prismaClient from "../config/prismaClient";

class NotificationModel {
    async createNotification(subject: string, description: string, accountId: number) {
        const newNotification = await prismaClient.notifications.create({
            data: {
                notifSubject: subject,
                notifDesc: description,
                userId: accountId
            }
        })

        return newNotification;
    }

    async setReadNotification(notifId: number) {
        const readNotification = await prismaClient.notifications.update({
            where: {
                notifId: notifId
            },
            data: {
                read: true
            }
        });

        return readNotification;
    }

    async getUserNotifications(accountId: number) {
        const userNotifications = await prismaClient.notifications.findMany({
            where: {
                AND: {
                    userId: accountId,
                    read: false
                }
            }
        })

        return userNotifications;
    }

    async getWeekRequests(accountId: number) {

        const newBusiness = await prismaClient.businessRegistry.findMany({
            orderBy: {
                submittedAt: 'desc'
            },
            select: {
                businessId: true,
                businessName: true,
                submittedAt: true,
                TIN: true,
                owners: true,
                approvals: true,
                addresses: true,
                approved: true,
                trackNumber: true,
                payments: true
            }
        });

        const renewBusiness = await prismaClient.businessRenewal.findMany({
            orderBy: {
                renewAt: 'desc'
            },
            include: {
                business: true,
                payments: true
            }
        });

        const buildingPermit = await prismaClient.buildingPermit.findMany({
            orderBy: {
                submittedAt: 'desc'
            },
            include: {
                approvals: true,
                payments: true
            }
        });

        const realEstate = await prismaClient.realEstate.findMany({
            orderBy: {
                submittedAt: 'desc'
            },
            include: {
                payments: true
            }
        });

        return {
            business: newBusiness,
            renew: renewBusiness,
            building: buildingPermit,
            realEstate: realEstate,
            productivity: await this.getProductivity(accountId)
        }
    }

    async getProductivity(accountId: number) {
        let curr = new Date; 
        let first = curr.getDate() - curr.getDay(); 
        let last = first + 6; 

        const firstday = new Date(curr.setDate(first));
        const lastday = new Date(curr.setDate(last));

        const businessApprovals = await prismaClient.businessApproval.aggregate({
            where: {
                AND: {
                    officialId: accountId,
                    approvedAt: {
                        lte: lastday,
                        gte: firstday
                    }
                }
            },
            _count: {
                approvalId: true
            }
        })

        const buildingApproval = await prismaClient.buildingApproval.aggregate({
            where: {
                AND: {
                    officialId: accountId,
                    approvedAt: {
                        lte: lastday,
                        gte: firstday
                    }
                }
            },
            _count: {
                approvalId: true
            }
        })

        return buildingApproval._count.approvalId + businessApprovals._count.approvalId;
    }
}

export default NotificationModel;