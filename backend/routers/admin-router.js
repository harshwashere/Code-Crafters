import express from "express";
import { getContact, getUser } from "../controllers/admin-controller.js";

export const router = express.Router()

router.route('/getcontacts').get(getContact)

router.route('/getuser').get(getUser)