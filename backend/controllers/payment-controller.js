import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils.js";
import razorpay from "../config/razorpay-setup.js";
import crypto from "crypto";
import Payment from "../models/payment-model.js";

const URL = "https://code-crafters-seven.vercel.app";
// https://code-crafters-seven.vercel.app

export const getKey = (req, res) => {
  res.status(200).json({ key: process.env.KEYID });
};

export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    const options = {
      amount: Number(amount * 100),
      currency: "INR",
    };

    const order = await razorpay.orders.create(options);
    // await Payment.create({
    //   order_id: order.id,
    //   currency: order.currency,
    //   status: order.status,
    //   amount: order.amount,
    //   amount_paid: order.amount_paid,
    //   amount_due: order.amount_due
    // })
    return res.status(200).json({ order });
  } catch (error) {
    console.log("This error is from payment-router.js            ", error);
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

      res.redirect(`${URL}/payment-success?reference=${razorpay_payment_id}`);
    } else {
      return res.status(400).json({ success: false });
    }
  } catch (error) {
    console.log("This error is from payment-router.js            ", error);
    return res
      .status(500)
      .json({ status: "error", message: "Error verifying payment" });
  }
};
