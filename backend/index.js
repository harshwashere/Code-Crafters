import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { connect } from "./utils/db.js";
import { route } from "./routers/auth-router.js";
import { router } from "./routers/admin-router.js";
import passport from "passport";
import "./config/passport-setup.js";
import cors from "cors";
import homeDishRoute from "./routers/home-dish-router.js";
import { googleLogin } from "./controllers/auth-controller.js";
import menuRoute from "./routers/menu-router.js";
import { paymentRoute } from "./routers/payment-router.js";
import scheduleRoute from "./routers/schedule-router.js";
import contactRoute from "./routers/contact-router.js";
import mealRoute from "./routers/meal-router.js";
import seedRoute from "./routers/seed-router.js";
import orderRoute from "./routers/order-router.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
connect();

const corsOptions = {
  origin: "http://localhost:5173",
  // https://code-crafters-seven.vercel.app/
  method: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credential: true,
};
app.use(cors(corsOptions));

app.set("view engine", "ejs");

app.use(express.json());

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));

app.use("/api", route);

app.use("/contact", contactRoute);

app.use("/homeapi", homeDishRoute);

app.use('/order', orderRoute)

app.use("/menu", menuRoute);

app.use("/admin", router);

app.use("/payment", paymentRoute);

app.use("/scheduleapi", scheduleRoute);

app.use("/api", mealRoute);

app.get("/", (req, res) => {
  res.send(
    '<h1>Google OAuth2.0</h1><br><a href="/auth/google">Login with google</a>'
  );
});

app.use(
  session({
    secret: "harshu",
    resave: false,
    session: true,
    saveUninitialized: true,
    cookie: { success: true },
  })
);

app.use(passport.initialize());
app.use(
  passport.session({
    secret: process.env.SESSIONKEY,
    resave: false,
    saveUninitialized: false,
    cookie: { success: true },
  })
);

//app.use('/google', route)

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  googleLogin
);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
