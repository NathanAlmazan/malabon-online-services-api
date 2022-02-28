import ApplicationError from './applicationError';

class NullArgumentError extends ApplicationError {
    constructor(message: string) {
        super(message, 400);
    }
}

export default NullArgumentError;