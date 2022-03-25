"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const approve_1 = __importDefault(require("./services/approve"));
const register_1 = __importDefault(require("./services/register"));
const buildingRegisterServices = new register_1.default();
const buildingApproveServices = new approve_1.default();
let buildingRoute = express_1.default.Router();
buildingRoute.post('/register', buildingRegisterServices.registerNewBuilding);
buildingRoute.get('/view/:id', buildingRegisterServices.getSubmittedForm);
buildingRoute.get('/user/requests', buildingRegisterServices.getUserRequests);
buildingRoute.get('/assess/forms', buildingApproveServices.getFormsToApprove);
buildingRoute.post('/approval/create', buildingApproveServices.addApproval);
buildingRoute.post('/approve/tax', buildingApproveServices.setTaxOrderOfPayment);
buildingRoute.post('/approve/fire/track/:buildingId', buildingApproveServices.setFireTrackingNumber);
buildingRoute.post('/appointment', buildingApproveServices.setClaimSchedule);
buildingRoute.get('/appointment/claim', buildingApproveServices.getFormsForClaim);
exports.default = buildingRoute;
//# sourceMappingURL=index.js.map