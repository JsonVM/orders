const express = require("express");
export const userRouter = express.Router();
const jwt = require("jsonwebtoken");

import { Request, Response } from "express";
import * as userController from "./user.controller";
import { User } from "./user.interface";
import { verificationCenter } from "../shared/consts";
import { verifications } from "../middleware/verifications";


userRouter.post(
  "/doLogin",
  verifications,
  async (req: Request, res: Response) => {
    try {
      let user: User = req.body;
      userController.doLogin(user).then((dbResponse) => {
        if (dbResponse.ok) {
          signJwt(dbResponse, res);
        } else {
          res.status(404).send(dbResponse);
        }
      });
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

function signJwt(dbResponse: any, res: Response<any, Record<string, any>>) {
  jwt.sign(dbResponse.user, "secret_key", (err: any, token: any) => {
    if (err) {
      res.status(400).send({ msg: "Error creating jwt" });
    } else {
      // saving response in cache
      verificationCenter.verifyCache.myCache.set("result", { token, dbResponse });
      res.status(200).send({ token, dbResponse });
    }
  });
}

