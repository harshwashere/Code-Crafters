import express from "express";

import {
  saveSuggestedMeal,
  getUserMeals,
  deleteMeal,
} from "../controllers/userMeals-controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const userMealsRouter = express.Router();

userMealsRouter.post("/save", authMiddleware, saveSuggestedMeal);

userMealsRouter.get("/:userId", authMiddleware, getUserMeals);

userMealsRouter.delete("/:mealId", authMiddleware, deleteMeal);

export default userMealsRouter;