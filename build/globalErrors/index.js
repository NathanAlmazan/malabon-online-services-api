"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const classifyErrors_1 = __importDefault(require("./classifyErrors"));
const internalError_1 = __importDefault(require("./internalError"));
const forbiddenError_1 = __importDefault(require("./forbiddenError"));
const notFoundError_1 = __importDefault(require("./notFoundError"));
const nullArgument_1 = __importDefault(require("./nullArgument"));
const unauthorizeError_1 = __importDefault(require("./unauthorizeError"));
const GlobalErrors = {
    NullArgumentError: nullArgument_1.default,
    InternalError: internalError_1.default,
    NotFoundError: notFoundError_1.default,
    UnauthorizedError: unauthorizeError_1.default,
    ForbiddenError: forbiddenError_1.default,
    classifyErrors: classifyErrors_1.default
};
exports.default = GlobalErrors;
//# sourceMappingURL=index.js.map