import express from "express";
import getMealData from "../controllers/meal-contoller.js";

const mealRoute = express.Router();

mealRoute.post("/fetch-meals", getMealData);

export default mealRoute;
