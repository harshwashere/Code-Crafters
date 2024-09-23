import express from "express";
import { getTiffinData } from "../controllers/home-dish-controller.js";

const homeDishRoute = express.Router()

homeDishRoute.get('/specialtiffin', getTiffinData)

export default homeDishRoute