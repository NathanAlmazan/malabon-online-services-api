
export interface CustomError extends Error {
    status: number;
}

class ApplicationError extends Error {
    status: number;
    constructor(message: string, status: number) {
        super();

        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name;
        this.message = message;
        this.status = status;
    }
}

export default ApplicationError;