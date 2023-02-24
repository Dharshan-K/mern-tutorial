/** @format */

const express = require("express");
const { errorHandler } = require("./middleware/errorMiddleware");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./goalRouter"));

app.listen(5000, () => console.log("server running"));
