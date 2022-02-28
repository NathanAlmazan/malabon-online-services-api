import { NextFunction, Request, Response } from "express";
import firebaseAdminAuth from "../firebaseAuth";

interface AuthInterface {
    uid: string;
    verified: boolean;
    role: Role;
}

type Role = "citizen" | "super" | "admin";

async function verifyAccessToken(token: string): Promise<AuthInterface | null> {
    try {
        const decodedToken = await firebaseAdminAuth.verifyIdToken(token);
        return {
            uid: decodedToken.uid,
            verified: decodedToken.email_verified != undefined ? decodedToken.email_verified : false,
            role: decodedToken.role as Role
        }
    } catch (err) {
        return null;
    }

}

export default async function checkCredentials(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "Access Token is required." });
    else {
        try {
            const decoded = await verifyAccessToken(authHeader);
            if (!decoded) return res.status(401).json({ error: "Invalid Access Token." });
            else {
                req.user = decoded; 
                next();
            }
        } catch {
            return res.status(401).json({ error: "Unauthorized" });
        }
    }
}
