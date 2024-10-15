import express from "express";
import {
  adminotp,
  adminotpverify,
  deleteContacts,
  deleteDeals,
  deleteMenuDish,
  deleteScheduleData,
  deleteSpecial,
  deleteUsers,
  getAdminUser,
  getAllOrder,
  getAllScheduleOrders,
  getContact,
  getDeals,
  getMenu,
  getSpecialTiffin,
  getUser,
} from "../controllers/admin-controller.js";

import adminMiddleware from "../middleware/adminMiddleware.js";

export const router = express.Router();

router.route("/getotp").post(adminotp);

router.route("/verifyotp").post(adminotpverify);

router.route("/adminuser").get(adminMiddleware, getAdminUser);

router.route("/getAllContacts").get(adminMiddleware, getContact);

router.route("/getAllUser").get(adminMiddleware, getUser);

router.route("/getAllMenu").get(adminMiddleware, getMenu);

router.route("/getAllSpecialTiffin").get(adminMiddleware, getSpecialTiffin);

router.route("/getAllDeals").get(adminMiddleware, getDeals);

router.route("/getAllOrders").get(adminMiddleware, getAllOrder);

router
  .route("/getAllScheduleOrders")
  .get(adminMiddleware, getAllScheduleOrders);

router.route("/foodremove/:id").delete(adminMiddleware, deleteMenuDish);

router.route("/contactremove/:id").delete(adminMiddleware, deleteContacts);

router.route("/userremove/:id").delete(adminMiddleware, deleteUsers);

router.route("/dealremove/:id").delete(adminMiddleware, deleteDeals);

router.route("/specialremove/:id").delete(adminMiddleware, deleteSpecial);

router.route("/scheduleremove/:id").delete(adminMiddleware, deleteScheduleData);
