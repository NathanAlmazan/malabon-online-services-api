"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function classifyErrors(name) {
    switch (name) {
        case "NullArgumentError":
            return 400;
            break;
        case "NotFoundError":
            return 404;
            break;
        case "UnauthorizedError":
            return 401;
            break;
        case "ForbiddenError":
            return 403;
            break;
        default:
            return 500;
    }
}
exports.default = classifyErrors;
//# sourceMappingURL=classifyErrors.js.map