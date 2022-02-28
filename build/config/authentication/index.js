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
const firebaseAuth_1 = __importDefault(require("../firebaseAuth"));
function verifyAccessToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const decodedToken = yield firebaseAuth_1.default.verifyIdToken(token);
            return {
                uid: decodedToken.uid,
                verified: decodedToken.email_verified != undefined ? decodedToken.email_verified : false,
                role: decodedToken.role
            };
        }
        catch (err) {
            return null;
        }
    });
}
function checkCredentials(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authHeader = req.headers.authorization;
        if (!authHeader)
            return res.status(401).json({ error: "Access Token is required." });
        else {
            try {
                const decoded = yield verifyAccessToken(authHeader);
                if (!decoded)
                    return res.status(401).json({ error: "Invalid Access Token." });
                else {
                    req.user = decoded;
                    next();
                }
            }
            catch (_a) {
                return res.status(401).json({ error: "Unauthorized" });
            }
        }
    });
}
exports.default = checkCredentials;
//# sourceMappingURL=index.js.map