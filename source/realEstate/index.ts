import express from "express";
import RealEstateServices from "./services/realEstateServices";

let realEstateRoute = express.Router();

const realEstateServices = new RealEstateServices();

realEstateRoute.post("/register", realEstateServices.realEstateRegister);
realEstateRoute.get("/requests", realEstateServices.getUserRequests);
realEstateRoute.get("/request/:estateId", realEstateServices.getRealEstate);

realEstateRoute.get("/approve", realEstateServices.getRealEstateToApprove);
realEstateRoute.post("/approve", realEstateServices.setTaxOrderOfPayment);
realEstateRoute.get("/claim", realEstateServices.getFormsToClaim);
realEstateRoute.post("/claim", realEstateServices.setClaim);

export default realEstateRoute;