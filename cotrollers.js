/** @format */
const asyncHandler = require("express-async-handler");
const Goal = require("./goalModel");
const User = require("./userModel");
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  console.log(req.body);
  res.status(200).json(goals);
});

const postGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("add text field");
  }

  const goal = await Goal.create({ text: req.body.text });
  res.status(200).json(goal);
});

const putGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("goal does not exist");
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }

  if (goal.user.toString() !== user.id) {
    req.status(401);
    throw new error("user not auhtorized");
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});

const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("goal does not exist");
  }

  await goal.remove(req.params.id);

  res.status(200).json({ id: req.params.id });
});

module.exports = { getGoals, postGoals, putGoals, deleteGoals };
