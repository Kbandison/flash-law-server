const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema({
  id: { type: String, default: uuidv4 },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  confirmPassword: String,
  phoneNumber: { type: String },
  role: { type: String, enum: ["customer", "admin"] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

const User = mongoose.model("users", userSchema);

module.exports = User;
