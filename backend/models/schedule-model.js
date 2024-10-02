import { Schema, model } from "mongoose";

const scheduleSchema = Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  mealFor: {
    type: String,
    required: true,
  },
  mealType: {
    type: String,
    required: true,
  },
  mealPlans: {
    type: Object,
    required: true,
  },
  duration: {
    type: Object,
    required: true,
  },
  mealsPerWeek: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

const scheduleModel = new model("schedule", scheduleSchema);

export default scheduleModel;
