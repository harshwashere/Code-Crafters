import { Contact } from "../models/contact-model.js";
import Deals from "../models/deals-model.js";
import Menu from "../models/menu-model.js";
import Order from "../models/orders-model.js";
import scheduleModel from "../models/schedule-model.js";
import TiffinData from "../models/specialTiffin-model.js";
import { User } from "../models/user-model.js";

export const getContact = async (req, res) => {
  try {
    const contacts = await Contact.find();

    if (!contacts || contacts.length === 0)
      return res.status(404).json({ message: "No contacts found" });

    res.status(200).json({ message: contacts });
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.find({}, { password: 0 });

    if (!user || user.length === 0)
      return res.status(404).json({ message: "No user found" });

    return res.status(200).json({ message: user });
  } catch (error) {
    console.log(error);
  }
};

export const getMenu = async (req, res) => {
  try {
    const menu = await Menu.find();

    if (!menu || menu.length === 0) {
      return res.status(404).json({ message: "No dishes found" });
    }

    return res.status(200).json({ menu });
  } catch (error) {
    console.error(error);
  }
};

export const getSpecialTiffin = async (req, res) => {
  try {
    const specialData = await TiffinData.find();

    if (!specialData || specialData.length === 0) {
      return res.status(404).json({ message: "No dishes found" });
    }

    return res.status(200).json({ specialData });
  } catch (error) {
    console.error(error);
  }
};

export const getDeals = async (req, res) => {
  try {
    const deals = await Deals.find();

    if (!deals || deals.length === 0) {
      return res.status(404).json({ message: "No deals found" });
    }

    return res.status(200).json({ deals });
  } catch (error) {
    console.error(error);
  }
};

export const getAllOrder = async (req, res) => {
  try {
    const order = await Order.find();

    if (!order || order.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    return res.status(200).json({ order });
  } catch (error) {
    console.error(error);
  }
};

export const getAllScheduleOrders = async (req, res) => {
  try {
    const scheduleData = await scheduleModel.find();

    if (!scheduleData || scheduleData.length === 0) {
      return res.status(404).json({ message: "No scheduled data found" });
    }

    return res.status(200).json({ scheduleData });
  } catch (error) {
    console.error(error);
  }
};

export const deleteMenuDish = async (req, res) => {
  try {
    const { id } = req.params;

    const menu = await Menu.findById(id);
    if (!menu) {
      return res.status(404).json({ message: "Dish not found" });
    }

    await Menu.findByIdAndDelete(id);
    return res.status(200).json({ message: "Dish deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const deleteContacts = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    await Contact.findByIdAndDelete(id);
    return res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUsers = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Users not found" });
    }

    await User.findByIdAndDelete(id);
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};
