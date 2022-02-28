"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const applicationError_1 = __importDefault(require("./applicationError"));
class NullArgumentError extends applicationError_1.default {
    constructor(message) {
        super(message, 400);
    }
}
exports.default = NullArgumentError;
//# sourceMappingURL=nullArgument.js.map