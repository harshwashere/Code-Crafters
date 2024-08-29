import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { connect } from "./utils/db.js";
import { route } from "./routers/auth-router.js";
dotenv.config()
const app = express()
const PORT = process.env.PORT
connect()

app.use(express.json())

app.use(bodyParser.json())

app.use(express.urlencoded({extended: false}))

app.use('/api', route)

app.listen(PORT, (req, res) => {
    console.log(`Server is running at ${PORT}`);
})