import { Schema, model } from "mongoose";

const scheduleOrder = new Schema({
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
  date: {
    type: Date,
    required: true,
  },
  mealTime: {
    type: String,
    required: true,
  },
  meal: {
    name: { type: String, required: true },
    type: { type: String, required: true },
    plan: { type: String, required: true },
    mealFor: { type: String, required: true },
    price: { type: Number, required: true },
    meals: { type: [String], required: true }, // Adjust type as necessary
  },
  quantity: { type: Number, required: true },
  totalPrice: {
    type: Number,
    required: true,
  },
  order_id: {
    type: String,
    default: "",
  },
  currency: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: "",
  },
  amount: {
    type: String,
    default: "",
  },
  amount_paid: {
    type: String,
    default: "",
  },
  amount_due: {
    type: String,
    default: "",
  },
  razorpay_order_id: {
    type: String,
    default: "",
  },
  razorpay_payment_id: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ScheduleOrder = new model("ScheduleOrder", scheduleOrder);

export default ScheduleOrder;