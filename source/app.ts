import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import GlobalErrors from './globalErrors';
import accounts from './accounts';
import businessRegister from './business/new';
import checkCredentials from './config/authentication';
import paymentRouter from './payments';

const corsOptions = {
    origin: ['http://192.168.0.106:3000', 'http://localhost:3000', 'https://malabon.vercel.app']
}

const app = express();
dotenv.config();

const port = process.env.PORT || 8000;

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//application modules
app.use('/accounts', accounts);
app.use('/business/new', checkCredentials, businessRegister);
app.use('/payments', checkCredentials, paymentRouter);


//error handlers
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err.stack);

    if (res.headersSent) {
        return next(err);
    }
    const statusCode = GlobalErrors.classifyErrors(err.name);
    res.status(statusCode).json({ message: err.message, name: err.name, status: statusCode });
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
}).on("error", (err) => console.log("Error", err.message));

