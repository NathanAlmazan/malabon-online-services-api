import express from "express";
import NotificationService from "./notificationService";

let notificationRoute = express.Router();
const notifServices = new NotificationService();

notificationRoute.get('/user', notifServices.getUserNotifications);
notificationRoute.get('/read/:id', notifServices.setNotificationAsRead);
notificationRoute.get('/admin', notifServices.getAdminDashboard);

export default notificationRoute;