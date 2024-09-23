import express from "express";
import { getMenuCategory } from "../controllers/home-dish-controller.js";

const menuRoute = express.Router()

menuRoute.get('/getmenucategory', getMenuCategory)

export default menuRoute