"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notificationService_1 = __importDefault(require("./notificationService"));
let notificationRoute = express_1.default.Router();
const notifServices = new notificationService_1.default();
notificationRoute.get('/user', notifServices.getUserNotifications);
notificationRoute.get('/read/:id', notifServices.setNotificationAsRead);
notificationRoute.get('/admin', notifServices.getAdminDashboard);
exports.default = notificationRoute;
//# sourceMappingURL=index.js.map