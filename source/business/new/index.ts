import express from "express";
import Approve from "./services/approve";
import ClaimPermit from "./services/claimPermit";
import Register from "./services/register";
import Zoning from "./services/zoning";

let businessRegister = express.Router();
const zoneService = new Zoning();
const registerService = new Register();
const approveService = new Approve();
const claimPermitService = new ClaimPermit();

businessRegister.post('/zone/get', zoneService.getZoneClassByLocation);
businessRegister.get('/zone/initialize', zoneService.initializeRecord);
businessRegister.get('/zone/classes', zoneService.getZoneClassifications);
businessRegister.get('/zone/businesses', zoneService.getBusinessTypes);
businessRegister.post('/zone/class', zoneService.createZoneClassification);
businessRegister.post('/zone/business', zoneService.createBusinessTypes);
businessRegister.post('/zone/boundary', zoneService.createZoneBoundary);

businessRegister.post('/form/submit', registerService.submitForm);
businessRegister.get('/form/search/:id', registerService.getSubmittedForm);
businessRegister.get('/applications', registerService.getUserApplications);

businessRegister.get('/approve/forms', approveService.getFormsToApprove);
businessRegister.post('/approve/add', approveService.addApproval);
businessRegister.post('/approve/tax', approveService.setTaxOrderOfPayment);
businessRegister.get('/approve/treasury', approveService.getTreasuryForms);
businessRegister.get('/approve/approved', approveService.getApprovedForms);
businessRegister.post('/approve/fire/track/:businessId', approveService.setFireTrackingNumber);
businessRegister.get('/official/progress', approveService.getOfficialProgress);

businessRegister.post('/appointment', claimPermitService.setClaimSchedule);
businessRegister.get('/appointment/:paymentId', claimPermitService.setFinishedAppointment);
businessRegister.get('/applications/claim', claimPermitService.getFormsForClaim);

export default businessRegister;