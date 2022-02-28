import { Express } from "express-serve-static-core";

type Role = "citizen" | "super" | "admin";

declare global {
    namespace Express {
        export interface Request {
            user: {
                uid: string;
                verified: boolean;
                role: Role;
            };
        }
    }
}