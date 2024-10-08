import express from "express";

import {
  deleteSchedule,
  getSchedule,
  getScheduleData,
  updateSchedule,
} from "../controllers/schedule-controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const scheduleRoute = express.Router();

// POST request to schedule a meal for a specific user
scheduleRoute.post("/getSchedule", authMiddleware, getSchedule);

// GET request to fetch schedules for a specific user
scheduleRoute.get("/getScheduleData", authMiddleware, getScheduleData);

// DELETE request to delete schedules for a specific user
scheduleRoute.delete("/deleteSchedule/:id", authMiddleware, deleteSchedule);

// PUT request to update schedules for a specific user
scheduleRoute.put("/updateSchedule/:id", authMiddleware, updateSchedule);

export default scheduleRoute;
