import { Schema, model } from "mongoose";

const orderModel = new Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const Order = new model('NormalOrder', orderModel)

export default Order