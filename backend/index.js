import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { connect } from "./utils/db.js";
import { route } from "./routers/auth-router.js";
import { router } from "./routers/admin-router.js";
// import { Passport } from "./config/passport-setup.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT;
connect();

app.set("view engine", "ejs");

app.use(express.json());

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));

app.use("/api", route);

app.use("/admin", router);

app.listen(PORT, (req, res) => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
