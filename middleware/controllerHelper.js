const User = require("../models/userSchema");
const bcrypt = require("bcrypt.js");

const hashedPassword = (password) => {
  return bcrypt.hash(password, 12);
};
