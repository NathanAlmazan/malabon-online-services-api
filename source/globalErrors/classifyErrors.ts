
function classifyErrors(name: string): number {
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
            return 500
    }
}

export default classifyErrors;