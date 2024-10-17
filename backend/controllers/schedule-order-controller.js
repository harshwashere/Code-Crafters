import ScheduleOrder from "../models/schedule-order-model.js";
import { User } from "../models/user-model.js";

// Create a schedule order
export const createOrder = async (req, res) => {
  try {
    const { formData, meal, date, quantity, mealTime, totalPrice } = req.body;

    const userId = req.userID; // Log user ID

    const user = await User.findOne({ _id: userId }); // Use correct query method

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const orderData = {
      userId,
      name: formData.name,
      email: formData.email,
      address: formData.address,
      phone: formData.phone,
      date: date,
      mealTime: mealTime,
      meal: {
        name: meal.name,
        type: meal.type,
        plan: meal.plan,
        mealFor: meal.mealFor,
        price: meal.price,
        meals: meal.meals,
      },
      quantity: quantity,
      totalPrice: totalPrice,
    };

    const newOrder = await ScheduleOrder.create(orderData);

    return res
      .status(200)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error("Order Creation Error:", error); // Catch and log any error
    return res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

// Get all orders for a specific user
export const getUserOrders = async (req, res) => {
  try {
    const { id } = req.params; // Extract user ID from request params

    const orders = await ScheduleOrder.find({ userId: id });

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    return res.status(200).json({ orders });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

// Get an order by payment ID
export const getOrderByPaymentId = async (req, res) => {
  try {
    const { razorpay_payment_id } = req.params; // Extract payment ID

    const order = await ScheduleOrder.findOne({ razorpay_payment_id });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({ order });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};