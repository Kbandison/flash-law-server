const User = require("../models/userSchema");
const Attorney = require("../models/attorneySchema");
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
        attorney_assigned: null,
      });

      await User.create(user);

      res.status(200).json({
        success: true,
        user,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    res.json({ message: error.message });
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
    const user = await User.findOne({ _id: req.params.id });

    res.json({ user });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// UPDATE USER
const updateUser = async (req, res) => {
  try {
    const user = await User.findOne({ user: req.user._id });
    console.log(user);

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

    await User.updateOne({ user }, { $set: updatedObject });

    res
      .status(200)
      .json({ message: "User has been updated!", user: updatedObject });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const addAttorney = async (req, res) => {
  //update users assigned attorney, and add user to attorneys assigned users list
  const id = req.user._id;
  const user = await User.findOne({ _id: id });

  const attorneyId = req.params.id;
  const attorney = await Attorney.findOne({ _id: attorneyId });

  !user && res.status(404).json("User not found!");
  !attorney && res.status(404).json("Attorney not found!");

  try {
    if (user.attorney_assigned === attorneyId) {
      return res.status(400).json({ message: "Attorney already assigned!" });
    } else {
      await User.updateOne(
        { _id: id },
        { $set: { attorney_assigned: attorneyId } }
      );
    }

    if (attorney.assigned_users.includes(id)) {
      return res.status(400).json({ message: "User already assigned!" });
    } else {
      await Attorney.updateOne(
        { _id: attorneyId },
        { $push: { assigned_users: id } }
      );
    }

    res.status(200).json({
      message: "Attorney has been added!",
      user,
      attorney,
    });
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
  addAttorney,
  registerUser,
  loginUser,
  deleteUser,
  deleteAllUsers,
};
