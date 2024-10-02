import express from "express"

import { getSchedule, getScheduleData } from "../controllers/schedule-controller.js"
import authMiddleware from "../middleware/authMiddleware.js"

const scheduleRoute = express.Router()

// POST request to schedule a meal for a specific user
scheduleRoute.post('/getSchedule', authMiddleware, getSchedule);

// GET request to fetch schedules for a specific user
scheduleRoute.get('/getScheduleData', authMiddleware, getScheduleData);

export default scheduleRoute;

