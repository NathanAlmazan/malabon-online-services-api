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
                userId: accountId
            }
        })

        return userNotifications;
    }
}

export default NotificationModel;