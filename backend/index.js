import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { connect } from "./utils/db.js";
import { route } from "./routers/auth-router.js";
import { router } from "./routers/admin-router.js";
import passport from "passport";
import "./config/passport-setup.js";
import cors from 'cors'
dotenv.config();
const app = express();
const PORT = process.env.PORT;
connect();

const corsOptions = {
  origin: "http://localhost:5173",
  method: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credential: true,
};

app.use(cors(corsOptions))

app.set("view engine", "ejs");

app.use(express.json());

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));

app.use("/api", route);

app.use("/admin", router);

const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
};

app.get("/", (req, res) => {
  res.send(
    '<h1>Google OAuth2.0</h1><br><a href="/auth/google">Login with google</a>'
  );
});

app.use(
  session({
    secret: "harshu",
    resave: false,
    saveUninitialized: true,
    cookie: { success: true },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  function (req, res) {
    let fullname = req.user.displayName;
    // console.log(firstname + ' ' + lastname);

    // Successful authentication, redirect home.
    return res.send(`<h1>Welcome ${fullname}</h1>`);
  }
);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});