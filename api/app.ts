import 'reflect-metadata';
import 'module-alias/register';
var express = require('express');
var expressApp = express();
import * as bodyParser from 'body-parser';
import { userRouter } from './user/user.router';
import { orderRouter } from './order/order.router';


expressApp.use(bodyParser.urlencoded({ extended: false }));
expressApp.use(bodyParser.json());

expressApp.get("/", (req, res) => {
  res.send("Orders app");
});

expressApp.use("/api/v1/user", userRouter);
expressApp.use("/api/v1/order", orderRouter);

const port = process.env.PORT || 3001;

expressApp.listen(port, () => {
  console.log(`Escuchando API en http://localhost:${port}`);
});

