/** @format */
const asyncHandler = require("express-async-handler");
const getGoals = asyncHandler(async (req, res) => {
  console.log(req.body);
  res.status(200).json({ message: "get goals" });
});

const postGoals = asyncHandler(async (req, res) => {
  if (!res.body.text()) {
    res.status(400);
    throw new Error("add text field");
  }
  res.status(200).json({ message: "post goals" });
});

const putGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `put goals ${req.params.id}` });
});

const deleteGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `delete goals ${req.params.id}` });
});

module.exports = { getGoals, postGoals, putGoals, deleteGoals };
