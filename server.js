/** @format */

const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./db");

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./goalRouter"));
app.use("/api/users", require("./userRouter"));

app.listen(5000, () => console.log(`server running`));
