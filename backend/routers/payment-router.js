import express from "express";
import { createOrder } from "../controllers/payment-controller.js";
export const paymentRoute = express.Router()

paymentRoute.post('/create-order', createOrder)
