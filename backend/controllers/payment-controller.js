import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils.js";
import razorpay from "../config/razorpay-setup.js";

export const createOrder = async (req, res) => {
  try {
    const { amount, currency, reciept, notes } = req.body;
  } catch (error) {
    console.log("This error is from payment-router.js", error);
  }
};

export const verifyOrder = (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const secret = razorpay.key_secret;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const isValidSign = validateWebhookSignature(
      body,
      razorpay_signature,
      secret
    );

    if (isValidSign) {
      console.log("Payment Verification Successful");
      return res.status(200).json({ status: "ok" });
    } else {
      console.log("Payment Verification Failed");
      return res.status(400).json({ status: "Verification Failed" });
    }
  } catch (error) {
    console.log("This error is from payment-router.js            ", error);
    return res
      .status(500)
      .json({ status: "error", message: "Error verifying payment" });
  }
};
