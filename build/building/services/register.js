"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const accountModel_1 = __importDefault(require("../../accounts/models/accountModel"));
const globalErrors_1 = __importDefault(require("../../globalErrors"));
const registerModel_1 = __importDefault(require("../models/registerModel"));
const registerModel = new registerModel_1.default();
const accountModel = new accountModel_1.default();
class BuildingRegisterServices {
    registerNewBuilding(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const buildingInfo = req.body;
            const userUID = req.user.uid;
            if (!buildingInfo) {
                const nullArgumentError = new globalErrors_1.default.NullArgumentError("Missing form data.");
                return next(nullArgumentError);
            }
            try {
                const account = yield accountModel.findAccountByUid(userUID);
                if (!account) {
                    const notFoundError = new globalErrors_1.default.NotFoundError("Account not found.");
                    return next(notFoundError);
                }
                const newBuilding = yield registerModel.registerNewBuilding(buildingInfo, account.userId);
                return res.status(201).json(newBuilding);
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
    getSubmittedForm(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const buildingId = parseInt(req.params.id);
            const userUID = req.user.uid;
            const userRole = req.user.role;
            if (isNaN(buildingId)) {
                const nullArgumentError = new globalErrors_1.default.NullArgumentError("Invalid parameters.");
                return next(nullArgumentError);
            }
            try {
                const form = yield registerModel.getBuildingForm(buildingId);
                if (!form) {
                    const notFoundError = new globalErrors_1.default.NotFoundError("Registration form not found.");
                    return next(notFoundError);
                }
                if (form.userAccount.uid != userUID && Boolean(userRole != "admin" && userRole != "super")) {
                    const unauthorizedError = new globalErrors_1.default.UnauthorizedError("You are not authorized to see this form.");
                    return next(unauthorizedError);
                }
                return res.status(200).json(form);
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
    getUserRequests(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userUID = req.user.uid;
            try {
                const account = yield accountModel.findAccountByUid(userUID);
                if (!account) {
                    const notFoundError = new globalErrors_1.default.NotFoundError("Account not found.");
                    return next(notFoundError);
                }
                const requests = yield registerModel.getUserForms(account.userId);
                return res.status(201).json(requests);
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
}
exports.default = BuildingRegisterServices;
//# sourceMappingURL=register.js.map