/** @format */
const asyncHandler = require("express-async-handler");
const Goal = require("./goalModel");
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();
  console.log(req.body);
  res.status(200).json(goals);
});

const postGoals = asyncHandler(async (req, res) => {
  if (!res.body.text()) {
    res.status(400);
    throw new Error("add text field");
  }
  const goal = await Goal.creacte();
  res.status(200).json({ message: "post goals" });
});

const putGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `put goals ${req.params.id}` });
});

const deleteGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `delete goals ${req.params.id}` });
});

module.exports = { getGoals, postGoals, putGoals, deleteGoals };
