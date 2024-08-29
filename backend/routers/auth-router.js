import express from "express";
import { login, register } from "../controllers/auth-controller.js";
import { contact } from "../controllers/contact-controller.js";
export const route =  express.Router()

route.post('/register', register)
route.post('/login', login)
route.post('/contact', contact)