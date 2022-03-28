"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const realEstateServices_1 = __importDefault(require("./services/realEstateServices"));
let realEstateRoute = express_1.default.Router();
const realEstateServices = new realEstateServices_1.default();
realEstateRoute.post("/register", realEstateServices.realEstateRegister);
realEstateRoute.get("/requests", realEstateServices.getUserRequests);
realEstateRoute.get("/request/:estateId", realEstateServices.getRealEstate);
realEstateRoute.get("/approve", realEstateServices.getRealEstateToApprove);
realEstateRoute.post("/approve", realEstateServices.setTaxOrderOfPayment);
realEstateRoute.get("/claim", realEstateServices.getFormsToClaim);
realEstateRoute.post("/claim", realEstateServices.setClaim);
exports.default = realEstateRoute;
//# sourceMappingURL=index.js.map