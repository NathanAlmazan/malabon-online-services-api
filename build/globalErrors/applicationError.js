"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApplicationError extends Error {
    constructor(message, status) {
        super();
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.message = message;
        this.status = status;
    }
}
exports.default = ApplicationError;
//# sourceMappingURL=applicationError.js.map