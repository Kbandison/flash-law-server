const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/****************************************AUTH CONTROLLERS****************************************/

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
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    res.json({ message: error });
  }
};

// LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    res.status(200).json({
      success: true,
      user,
      token: generateToken(user._id),
      // refreshToken: refreshToken(user._id),
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// GENERATE TOKEN FOR REGISTER USER!!
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1hr",
  });
};

/****************************************USER CONTROLLERS****************************************/

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

// UPDATE USER
const updateUser = async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id });

    !user && res.status(404).json("User not found!");

    const { firstName, lastName, email, phoneNumber } = req.body;

    const updatedObject = {
      firstName,
      lastName,
      email,
      phoneNumber,
      updatedAt: new Date(),
    };

    if (email !== undefined) {
      const role = email.includes("@fladmin.com") ? "admin" : "customer";
      updatedObject.role = role;
    }

    await User.updateOne({ id: req.params.id }, { $set: updatedObject });

    res
      .status(200)
      .json({ message: "User has been updated!", user: updatedObject });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// DELETE USER
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ id });

    !user && res.status(404).json("User not found!");

    await User.deleteOne(user);

    res.status(200).json({ message: "User has been deleted!" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// DELETE ALL USERS
const deleteAllUsers = async (req, res) => {
  try {
    await User.deleteMany();

    res.status(200).json({ message: "All users have been deleted!" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = {
  getUser,
  getUsers,
  updateUser,
  registerUser,
  loginUser,
  deleteUser,
  deleteAllUsers,
};
