/** @format */
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("./userModel");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("require all fields");
  }

  //check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("user exist");
  } else {
    res.status(200);
    throw new Error("user des not exist");
  }
  //hash password using bcrypt
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("user not created");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res
      .json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      })
      .json({ message: "user exista" });
  } else {
    res.status(400);
    throw new Error("invalid credentials");
  }

  res.json({ message: "login user" });
});

const getUser = asyncHandler(async (req, res) => {
  res.json({ message: "get user" });
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_TOKEN, { expiresIn: "30d" });
};
module.exports = { registerUser, loginUser, getUser };
