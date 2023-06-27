const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// GET USERS
const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.json({ users });
  } catch (error) {
    res.json({ message: error });
  }
};

// GET USER BY ID
const getUser = async (req, res) => {
  try {
    const user = await user.findOne({ _id: req.params.id });

    res.json({ user });
  } catch (error) {
    res.json({ message: error });
  }
};

// REGISTER NEW USER
const registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      confirmPassword,
    } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return response.status(400).json({ message: "User already exists!" });
    }

    if (password !== confirmPassword) {
      return response.status(400).json({ message: "Passwords do not match!" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 12);

      const role = email.includes("@fladmin.com") ? "admin" : "customer";

      const user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
        phoneNumber,
      });

      await User.create(user);

      res.status(200).json({
        success: true,
        user,
        // token: generateToken(user._id)
      });
    }
  } catch (error) {
    res.json({ message: error });
  }
};

/// FINISH GENERATE TOKEN FOR REGUSTER USER!!

module.exports = {
  getUser,
  getUsers,
  registerUser,
};
