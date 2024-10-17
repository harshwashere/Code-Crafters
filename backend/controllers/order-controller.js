import Order from "../models/orders-model.js";
import { User } from "../models/user-model.js";
import { getAllScheduleOrders } from "./admin-controller.js";

export const createOrder = async (req, res) => {
  try {
    const { userDetails, dishes, totalPrice } = req.body; // Destructure the incoming request body
    const userID = req.userID; // Retrieved from auth middleware

    // Fetch user details to ensure the user exists
    const user = await User.findById(userID);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Create the order data
    const orderData = {
      userId: userID,
      name: userDetails.name, // Assuming userDetails contains name
      email: userDetails.email, // Assuming userDetails contains email
      phone: userDetails.phone, // Assuming userDetails contains phone
      address: userDetails.address, // Assuming userDetails contains address
      dishes: dishes, // Use the dishes array directly from request body
      totalPrice: totalPrice, // Use totalPrice directly from request body
    };

    const newOrder = await Order.create({userId: userID,
      name: userDetails.name, // Assuming userDetails contains name
      email: userDetails.email, // Assuming userDetails contains email
      phone: userDetails.phone, // Assuming userDetails contains phone
      address: userDetails.address, // Assuming userDetails contains address
      dishes: dishes, // Use the dishes array directly from request body
      totalPrice: totalPrice, // Use totalPrice directly from request body
      });

    // Optionally update user details if needed
    user.name = userDetails.name;
    user.phone = userDetails.phone;
    user.address = userDetails.address;
    await user.save();

    if (!newOrder) {
      return res.status(400).json({
        message: "Your details were not submitted. Please try again.",
      });
    }

    return res
      .status(200)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error("Order Creation Error:", error); // Log the error
    return res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
      const { id } = req.params;

      if (!id) {
          return res.status(400).json({ message: "User ID is required." });
      }

      const orders = await Order.find({ userId: id });

      if (!orders || orders.length === 0) {
          return res.status(404).json({ message: "No orders found" });
      }

      return res.status(200).json({ orders });
  } catch (error) {
      console.error("Error fetching orders:", error);
      return res.status(500).json({ message: "Internal server error", details: error.message });
  }
};

export const getOrderByPaymentId = async (req, res) => {
  try {
    const { razorpay_payment_id } = req.params;

    const order = await Order.find({ razorpay_payment_id });

    if (!order) {
      return res.status(404).json({ message: "Dish not found", order });
    }

    return res.status(200).json({ order });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
