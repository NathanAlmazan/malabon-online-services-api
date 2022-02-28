import classifyErrors from "./classifyErrors";
import InternalError from "./internalError";
import ForbiddenError from "./forbiddenError";
import NotFoundError from "./notFoundError";
import NullArgumentError from "./nullArgument";
import UnauthorizedError from "./unauthorizeError";

const GlobalErrors = {
    NullArgumentError,
    InternalError,
    NotFoundError,
    UnauthorizedError,
    ForbiddenError,
    classifyErrors
}

export default GlobalErrors;