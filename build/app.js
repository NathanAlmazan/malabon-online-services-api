"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const globalErrors_1 = __importDefault(require("./globalErrors"));
const accounts_1 = __importDefault(require("./accounts"));
const new_1 = __importDefault(require("./business/new"));
const authentication_1 = __importDefault(require("./config/authentication"));
const payments_1 = __importDefault(require("./payments"));
const corsOptions = {
    origin: ['http://192.168.0.106:3000', 'http://localhost:3000']
};
const app = (0, express_1.default)();
dotenv_1.default.config();
const port = process.env.PORT || 8000;
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
//application modules
app.use('/accounts', accounts_1.default);
app.use('/business/new', authentication_1.default, new_1.default);
app.use('/payments', authentication_1.default, payments_1.default);
//error handlers
app.use((err, req, res, next) => {
    console.log(err.stack);
    if (res.headersSent) {
        return next(err);
    }
    const statusCode = globalErrors_1.default.classifyErrors(err.name);
    res.status(statusCode).json({ message: err.message, name: err.name, status: statusCode });
});
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
}).on("error", (err) => console.log("Error", err.message));
//# sourceMappingURL=app.js.map