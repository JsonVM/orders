const jwt = require('jsonwebtoken');
import { Request, Response } from "express";

export const isAdmin = async (req: Request, res: Response, next: any): Promise<any> => {
    const token = req.headers["tokensito"];

    try {
        const decoded = jwt.verify(token, "secret_key")
        const role = decoded.role;
        if (role != 'administrator'){
            return res.status(403).json({message: "Administrator role required"});
        } else {
            next();
        }   

    } catch {
        res.status(403).json({ok:false, message:"invalid token"})
    }
}