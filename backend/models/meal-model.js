// models/Meal.js
import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  plan: { type: String, required: true },
  mealFor: { type: String, required: true },
  price: { type: Number, required: true },
  meals: { type: [String], required: true }, // Array of meal names
});

const mealModel = new mongoose.model("Meal", mealSchema);

export default mealModel;
