const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const attorneySchema = new mongoose.Schema({
  id: { type: String, default: uuidv4 },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  confirmPassword: String,
  phoneNumber: { type: String },
  role: { type: String, default: "attorney" },
  age: { type: Number },
  experience_length: Number,
  achievements: String,
  education: String,
  specialty: String,
  areas_of_experience: Array,
  summary: String,
  assigned_users: Array,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

const Attorney = mongoose.model("attorneys", attorneySchema);

module.exports = Attorney;
