import express from "express";
import {
  deleteContacts,
  deleteMenuDish,
  deleteUsers,
  getAllOrder,
  getAllScheduleOrders,
  getContact,
  getDeals,
  getMenu,
  getSpecialTiffin,
  getUser,
} from "../controllers/admin-controller.js";

export const router = express.Router();

router.route("/getAllContacts").get(getContact);

router.route("/getAllUser").get(getUser);

router.route("/getAllMenu").get(getMenu);

router.route("/getAllSpecialTiffin").get(getSpecialTiffin);

router.route("/getAllDeals").get(getDeals);

router.route("/getAllOrders").get(getAllOrder);

router.route("/getAllScheduleOrders").get(getAllScheduleOrders);

router.route("/foodremove/:id").delete(deleteMenuDish);

router.route("/contactremove/:id").delete(deleteContacts);

router.route("/userremove/:id").delete(deleteUsers);