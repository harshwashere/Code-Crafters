import express from "express"

import { getSchedule, getScheduleData } from "../controllers/schedule-controller.js"
import { authMiddleware } from "../middleware/authMiddleware.js"

const scheduleRoute = express.Router()

scheduleRoute.post("/schedule",authMiddleware, getSchedule);
scheduleRoute.get("/getSchedule",authMiddleware,getScheduleData);

export default scheduleRoute;

