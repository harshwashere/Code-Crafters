import express from "express";
import createMealSchedule from "../controllers/meal-contoller.js";

const mealRoute = express.Router();

mealRoute.post("/schedule", createMealSchedule);

export default mealRoute;
