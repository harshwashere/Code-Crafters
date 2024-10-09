import { Schema, model } from "mongoose";

const paymentModel = new Schema({
  razorpay_order_id:{
    type: String,
    required: true
  },
  razorpay_payment_id:{
    type: String,
    required: true
  },
  razorpay_signature:{
    type: String,
    required: true
  },
});

const Payment = new model('Payment', paymentModel)

export default Payment;
