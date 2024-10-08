import express from "express";
import seedMeals from "../controllers/seedMeal.js";
const seedRoute = express.Router();

seedRoute.post("/seed-meals", seedMeals);

export default seedRoute;
