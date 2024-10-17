import express from "express";

import {
  deleteSchedule,
  getSchedule,
  getScheduleData,
  updateSchedule,
} from "../controllers/schedule-controller.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { createOrder, getOrderByPaymentId, getUserOrders } from "../controllers/schedule-order-controller.js";

const scheduleRoute = express.Router();

// POST request to schedule a meal for a specific user
scheduleRoute.post("/getSchedule", authMiddleware, getSchedule);

// GET request to fetch schedules for a specific user
scheduleRoute.get("/getScheduleData", authMiddleware, getScheduleData);

// DELETE request to delete schedules for a specific user
scheduleRoute.delete("/deleteSchedule/:id", authMiddleware, deleteSchedule);

// PUT request to update schedules for a specific user
scheduleRoute.put("/updateSchedule/:id", authMiddleware, updateSchedule);

scheduleRoute.post("/createOrder", authMiddleware, createOrder);

// Route to get all orders for a specific user by user ID
scheduleRoute.get("/user/:id", authMiddleware, getUserOrders);


export default scheduleRoute;