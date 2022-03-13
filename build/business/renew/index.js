"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const renewBusiness_1 = __importDefault(require("./services/renewBusiness"));
let renewRoute = express_1.default.Router();
const renewBusinessService = new renewBusiness_1.default();
renewRoute.get('/owned', renewBusinessService.getAvailableBusiness);
renewRoute.post('/byId', renewBusinessService.renewBusinessById);
renewRoute.post('/byCredentials', renewBusinessService.renewBusinessByCredentials);
renewRoute.get('/requests', renewBusinessService.getBusinessTorenew);
renewRoute.post('/tax', renewBusinessService.setTaxOrderOfPayment);
renewRoute.get('/myRequests', renewBusinessService.getUserRequest);
renewRoute.get('/assess/:renewId', renewBusinessService.getRenewBusinessRequest);
renewRoute.get('/request/claim', renewBusinessService.getFormsToClaim);
renewRoute.post('/request/setclaim', renewBusinessService.setClaim);
exports.default = renewRoute;
//# sourceMappingURL=index.js.map