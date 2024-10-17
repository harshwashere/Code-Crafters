import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createOrder, getOrderByPaymentId, getUserOrders } from "../controllers/order-controller.js";
const orderRoute = express.Router()

orderRoute.route('/createorder').post(authMiddleware, createOrder)

orderRoute.route('/getUserOrder/:id').get(authMiddleware, getUserOrders)

orderRoute.route('/getOrderByPaymentId/:razorpay_payment_id').get(authMiddleware, getOrderByPaymentId)

export default orderRoute