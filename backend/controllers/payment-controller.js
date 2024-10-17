import Order from "../models/orders-model.js"; // Ensure this model is correct
import razorpay from "../config/razorpay-setup.js";
import crypto from "crypto";
import Payment from "../models/payment-model.js";
import ScheduleOrder from "../models/schedule-order-model.js";

const URL = "https://code-crafters-seven.vercel.app";
// https://code-crafters-seven.vercel.app

export const getKey = (req, res) => {
  return res.status(200).json({ key: process.env.KEYID });
};

export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const userId = req.userID;

    const options = {
      amount: Number(amount) * 100, // Convert to paise
      currency: "INR",
    };

    const userOrder = await Order.findOne({ userId });
    const order = await razorpay.orders.create(options);
    userOrder._id;
    userOrder.order_id = order.id;
    userOrder.currency = order.currency;
    userOrder.status = order.status;
    userOrder.amount = order.amount;
    userOrder.amount_paid = order.amount_paid;
    userOrder.amount_due = order.amount_due;
    await userOrder.save();

    return res.status(200).json({ order });
  } catch (error) {
    console.error("This error is from payment-router.js", error);
    res.status(500).json({ error: "Error creating order" });
  }
};

export const verifyOrder = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const signature = razorpay_order_id + "|" + razorpay_payment_id;
    const isVerifiedSignature = crypto
      .createHmac("sha256", process.env.KEYSECRET)
      .update(signature.toString())
      .digest("hex");

    const isAuthentic = isVerifiedSignature === razorpay_signature;

    if (isAuthentic) {
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

      const existingOrder = await Order.findOne({
        order_id: razorpay_order_id,
      });
      if (!existingOrder) {
        return res.status(404).json({ error: "Order not found" });
      }

      existingOrder.razorpay_order_id = razorpay_order_id;
      existingOrder.razorpay_payment_id = razorpay_payment_id;
      existingOrder.status = "Paid"; // Update order status
      existingOrder.amount_due = undefined;
      await existingOrder.save(); // Correct usage

      res.redirect(`${URL}/order`);
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    console.error("This error is from payment-router.js", error);
    res.status(500).json({ error: "Error verifying payment" });
  }
};

export const createScheduleOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const userId = req.userID;

    const options = {
      amount: Number(amount) * 100, // Convert to paise
      currency: "INR",
    };

    let userOrder;
    try {
      userOrder = await ScheduleOrder.findOne({ userId });
    } catch (err) {
      console.error("Error fetching user order:", err);
      return res.status(500).json({ error: "Database query failed" });
    }

    if (!userOrder) {
      console.log("No user order found for userId:", userId);
      return res.status(404).json({ error: "Order not found" });
    }

    const order = await razorpay.orders.create(options);

    // Update userOrder details
    userOrder.order_id = order.id;
    userOrder.currency = order.currency;
    userOrder.status = order.status;
    userOrder.amount = order.amount;
    userOrder.amount_paid = order.amount_paid;
    userOrder.amount_due = order.amount_due;

    await userOrder.save();

    return res.status(200).json({ order });
  } catch (error) {
    console.error("This error is from payment-router.js", error);
    return res.status(500).json({ error: "Error verifying payment" });
  }
};

export const scheduleVerifyOrder = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const signature = razorpay_order_id + "|" + razorpay_payment_id;
    const isVerifiedSignature = crypto
      .createHmac("sha256", process.env.KEYSECRET)
      .update(signature.toString())
      .digest("hex");

    const isAuthentic = isVerifiedSignature === razorpay_signature;

    if (isAuthentic) {
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

      const existingOrder = await ScheduleOrder.findOne({
        order_id: razorpay_order_id,
      });
      if (!existingOrder) {
        return res.status(404).json({ error: "Order not found" });
      }

      existingOrder.razorpay_order_id = razorpay_order_id;
      existingOrder.razorpay_payment_id = razorpay_payment_id;
      existingOrder.status = "Paid"; // Update order status
      existingOrder.amount_due = undefined;
      await existingOrder.save(); // Correct usage

      res.redirect(`${URL}/order`);
      // res.status(200).json({
      //   success: true,
      //   order_id: existingOrder.order_id,
      //   payment_id: razorpay_payment_id,
      // });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    console.error("This error is from payment-router.js", error);
    res.status(500).json({ error: "Error verifying payment" });
  }
};
