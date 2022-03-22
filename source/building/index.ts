import express from "express";
import BuildingApproveService from "./services/approve";
import BuildingRegisterServices from "./services/register";

const buildingRegisterServices = new BuildingRegisterServices();
const buildingApproveServices = new BuildingApproveService();

let buildingRoute = express.Router();

buildingRoute.post('/register', buildingRegisterServices.registerNewBuilding);
buildingRoute.get('/view/:id', buildingRegisterServices.getSubmittedForm);

buildingRoute.get('/assess/forms', buildingApproveServices.getFormsToApprove);
buildingRoute.post('/approval/create', buildingApproveServices.addApproval);
buildingRoute.post('/approve/tax', buildingApproveServices.setTaxOrderOfPayment);
buildingRoute.post('/approve/fire/track/:buildingId', buildingApproveServices.setFireTrackingNumber);

buildingRoute.post('/appointment', buildingApproveServices.setClaimSchedule);
buildingRoute.get('/appointment/claim', buildingApproveServices.getFormsForClaim);

export default buildingRoute;