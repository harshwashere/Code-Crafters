import mongoose from "mongoose";

const userSuggestedMealsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  mealTime: { type: String, required: true },
  meal: {
    name: { type: String, required: true },
    type: { type: String, required: true },
    plan: { type: String, required: true },
    mealFor: { type: String, required: true },
    price: { type: Number, required: true },
    meals: { type: [String], required: true }, // Adjust type as necessary
  },
  quantity: { type: Number, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const userMealsModel = new mongoose.model("userMeal", userSuggestedMealsSchema);
export default userMealsModel;