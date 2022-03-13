import express from "express";
import RenewBusiness from "./services/renewBusiness";

let renewRoute = express.Router();

const renewBusinessService = new RenewBusiness();

renewRoute.get('/owned', renewBusinessService.getAvailableBusiness);
renewRoute.post('/byId', renewBusinessService.renewBusinessById);
renewRoute.post('/byCredentials', renewBusinessService.renewBusinessByCredentials);
renewRoute.get('/requests', renewBusinessService.getBusinessTorenew);
renewRoute.post('/tax', renewBusinessService.setTaxOrderOfPayment);
renewRoute.get('/myRequests', renewBusinessService.getUserRequest);
renewRoute.get('/assess/:renewId', renewBusinessService.getRenewBusinessRequest);
renewRoute.get('/request/claim', renewBusinessService.getFormsToClaim);
renewRoute.post('/request/setclaim', renewBusinessService.setClaim);

export default renewRoute;

