const express = require("express");
export const userRouter = express.Router();
const jwt = require("jsonwebtoken");

import { Request, Response } from "express";
import * as userController from "./user.controller";
import { User } from "./user.interface";

const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 10 });

userRouter.post("/doLogin", async (req: Request, res: Response) => {
  if (myCache.has("result")) {
    res.send(myCache.get("result"));
    console.log("Desde caché");
  } else {
    try {
      let user: User = req.body;
      console.log("desde DB");
      userController.doLogin(user).then((dbResponse) => {

        if (dbResponse.ok) {
          jwt.sign(dbResponse.user, "secret_key", (err: any, token: any) => {
            if (err) {
              res.status(400).send({ msg: "Error creating jwt" });
            } else {
            myCache.set("result", {token, dbResponse});
              res.status(200).send({ token, dbResponse });
            }
          });

        } else {
          res.status(404).send(dbResponse);
        }
      });
    } catch (e) {
      res.status(500).send(e);
    }
  }
});
