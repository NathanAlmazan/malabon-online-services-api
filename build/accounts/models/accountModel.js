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
const prismaClient_1 = __importDefault(require("../../config/prismaClient"));
class AccountModel {
    //create account
    createAccount(firstName, lastName, email, uid, gender, middleName, phoneNumber, isActive, provider) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield prismaClient_1.default.accounts.create({
                data: {
                    uid: uid,
                    firstName: firstName,
                    middleName: middleName,
                    lastName: lastName,
                    gender: gender,
                    email: email,
                    phoneNumber: phoneNumber,
                    provider: provider ? provider : "EmailPassword",
                    isActive: isActive
                }
            });
            return account;
        });
    }
    updateAccount(uid, isActive, firstName, lastName, middleName, gender, email, phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield prismaClient_1.default.accounts.update({
                where: {
                    uid: uid
                },
                data: {
                    firstName: firstName,
                    middleName: middleName,
                    lastName: lastName,
                    gender: gender,
                    email: email,
                    phoneNumber: phoneNumber,
                    isActive: isActive
                }
            });
            return account;
        });
    }
    findAccountByUid(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield prismaClient_1.default.accounts.findUnique({
                where: {
                    uid: uid,
                }
            });
            return account;
        });
    }
    findAccountByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield prismaClient_1.default.accounts.findUnique({
                where: {
                    email: email,
                }
            });
            return account;
        });
    }
    deleteAccount(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield prismaClient_1.default.accounts.delete({
                where: {
                    uid: uid,
                }
            });
            return account;
        });
    }
}
exports.default = AccountModel;
//# sourceMappingURL=accountModel.js.map