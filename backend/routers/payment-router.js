import express from "express";
import { createOrder, createScheduleOrder, getKey, scheduleVerifyOrder, verifyOrder } from "../controllers/payment-controller.js";
import authMiddleware from "../middleware/authMiddleware.js";
export const paymentRoute = express.Router();

paymentRoute.route('/getkey').get(getKey)

paymentRoute.route("/createOrder").post(authMiddleware,createOrder);

paymentRoute.route("/verifyOrder").post(verifyOrder);

paymentRoute.route("/payment-success").post((req, res) => {
  res.status(200).json("Payment done successfully");
});

paymentRoute.route('/scheduleCreateOrder').post(authMiddleware, createScheduleOrder)

paymentRoute.route('/scheduleVerifyOrder').post(scheduleVerifyOrder)