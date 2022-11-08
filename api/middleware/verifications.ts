import { Request, Response } from "express";
import { verificationCenter } from "../shared/consts";

const verifyAuth = async (req: Request, res: Response, next: any): Promise<any> => {
    if (!verificationCenter.verifyAuth.verify(req.body)) {
        if (!verifyBruteForce(req, res, next)) {
            res.status(404).send({ok:false, message:"bad credentials"})
        }
        
    } else {
        console.log("verify auth passed!")
        next()
    }
}

const verifySanitize = async (req: Request, res: Response, next: any): Promise<any> => {
    if (!verificationCenter.verifySanitize.verify(req.body)) {
        res.status(404).send({ok:false, message:"wrong data been sent"})
    } else {
        console.log("verify sanitize passed!")
        next()
    }
}

const verifyBruteForce = async (req: Request, res: Response, next: any): Promise<any> => {
    if (!verificationCenter.verifyBruteForce.verify()) {
        res.status(404).send({ok:false, message:"Ip blocked"})
    } else {
        console.log("verify brute force passed!")
        next()
    }
}

const verifyCache = async (req: Request, res: Response, next: any): Promise<any> => {
    if (verificationCenter.verifyCache.verify()) {
        res.send(verificationCenter.verifyCache.getMyCache().get("result"));
        console.log("Response from cache!");
    } else {
        next()
    }
}

export const verifications = [verifyCache,verifySanitize,verifyAuth ]