import { Schema, model } from "mongoose";

const orderModel = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  dishes: [
    {
      dishName: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      dishTotalPrice: {
        type: Number,
        required: true,
      },
    },
  ], 
  totalPrice: {
    type: String,
    required: true,
  },
  order_id: {
    type: String,
    default: '',
  },
  currency: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    default: '',
  },
  amount: {
    type: String,
    default: '',
  },
  amount_paid: {
    type: String,
    default: '',
  },
  amount_due: {
    type: String,
    default: '',
  },
  razorpay_order_id: {
    type: String,
    default: '',
  },
  razorpay_payment_id: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Order = new model("NormalOrder", orderModel);

export default Order;
