import ApplicationError from './applicationError';

class ForbiddenError extends ApplicationError {
    constructor(message: string) {
        super(message, 403);
    }
}

export default ForbiddenError;