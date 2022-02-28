import ApplicationError from './applicationError';

class InternalError extends ApplicationError {
    constructor(message: string) {
        super(message, 500);
    }
}

export default InternalError;