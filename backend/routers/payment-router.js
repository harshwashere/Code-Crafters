import express from "express";
import { createOrder, getKey, verifyOrder } from "../controllers/payment-controller.js";
export const paymentRoute = express.Router();

paymentRoute.route('/getkey').get(getKey)

paymentRoute.route("/createOrder").post(createOrder);

paymentRoute.route("/verifyOrder").post(verifyOrder);

paymentRoute.route("/payment-success").post((req, res) => {
  res.status(200).json("Payment done successfully");
});
