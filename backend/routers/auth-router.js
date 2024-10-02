import express from "express";
import { deals, sendOTP, updateUserDetails, user, verifyOTP } from "../controllers/auth-controller.js";
import { contact } from "../controllers/contact-controller.js";
import authMiddleware from "../middleware/authMiddleware.js";
export const route = express.Router();

route.patch('/updateuserdetails', authMiddleware, updateUserDetails)
route.get('/deals', deals)
route.post("/otp", sendOTP);
route.post("/login", verifyOTP);
route.post("/contact", contact);
route.get('/user', authMiddleware, user)
route.get("/login", (req, res) => {
  res.send("login");
});
route.get("/logout", (req, res) => {
  res.send("logging out");
});
// route.get(
//   "/auth/google",
//   passport.authenticate("google", {
//     scope: ["profile", "email"],
//     successRedirect: "/api/auth/google/redirect"
//   })
// );

// route.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/" }),
//   function (req, res) {
//     let fullname = req.user.displayName;
//     // console.log(firstname + ' ' + lastname);

//     // Successful authentication, redirect home.
//     return res.send(`<h1>Welcome ${fullname}</h1>`);
//   }
// );
