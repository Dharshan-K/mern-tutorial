/** @format */
const {
  getGoals,
  postGoals,
  deleteGoals,
  putGoals,
} = require("./cotrollers.js");
const express = require("express");
const router = express.Router();

router.route("/").get(getGoals).post(postGoals);
router.route("/:id").delete(deleteGoals).put(putGoals);

module.exports = router;
