import express from "express";
import { createOrder, verifyOrder } from "../controllers/payment-controller.js";
export const paymentRoute = express.Router();

paymentRoute.post("/create-order", createOrder);

paymentRoute.post("/verfy-order", verifyOrder);

paymentRoute.post("/payment-success", (req, res) => {
  res.status(200).json("Payment done successfully")
});
