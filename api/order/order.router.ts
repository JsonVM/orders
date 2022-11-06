const express = require("express");
export const orderRouter = express.Router();

import { Request, Response } from "express";
import * as orderController from "./order.controller";
import { Order } from "./order.interface";
import * as roleVerification from "../middleware/jwtVerifyRole";

orderRouter.post("/createOrder", [roleVerification.isAdmin], async (req: Request, res: Response) => {
    let order: Order = req.body;
    orderController.createOrder(order).then((dbResponse) => {
        if (dbResponse.ok) {
            res.status(200).send(dbResponse);
        } else {
            res.status(404).send(dbResponse);
        }
    })
})