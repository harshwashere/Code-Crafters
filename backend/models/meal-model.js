// models/Meal.js
import mongoose from "mongoose";

const MealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["lunch", "dinner", "both"], required: true },
  dietary: {
    type: String,
    enum: ["veg", "non-veg", "diabetic"],
    required: true,
  },
  // Add any additional fields you require
});

const mealModel = mongoose.model("Meal", MealSchema);
export default mealModel;
