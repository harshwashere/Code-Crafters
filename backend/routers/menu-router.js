import express from "express";
import { getMenuCategory, getMenuDishByCategory } from "../controllers/home-dish-controller.js";

const menuRoute = express.Router()

menuRoute.get('/getmenucategory', getMenuCategory)
menuRoute.get('/getmenu', getMenuDishByCategory)

export default menuRoute