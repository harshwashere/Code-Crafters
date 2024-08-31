import express from "express";
import { login, register } from "../controllers/auth-controller.js";
import { contact } from "../controllers/contact-controller.js";
import passport from "passport";
export const route = express.Router();

route.post("/register", register);
route.post("/login", login);
route.post("/contact", contact);
route.get("/login", (req, res) => {
  res.send("login");
});
route.get("/logout", (req, res) => {
  res.send("logging out");
});
route.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

route.post("/auth/google/redirect", (req, res) => {
    res.redirect()
});
