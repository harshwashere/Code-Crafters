// models/Meal.js
import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
  type: { type: String, required: true },
  plan: { type: String, required: true },
  mealFor: { type: String, required: true },
  price: { type: Number, required: true },
  meals: { type: [String], required: true }, // Array of meal names
  quantity: { type: Number, required: true },
});

const mealModel = new mongoose.model("Meal", mealSchema);

export default mealModel;