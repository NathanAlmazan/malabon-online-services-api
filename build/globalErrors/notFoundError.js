"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const applicationError_1 = __importDefault(require("./applicationError"));
class NotFoundError extends applicationError_1.default {
    constructor(message) {
        super(message, 404);
    }
}
exports.default = NotFoundError;
//# sourceMappingURL=notFoundError.js.map