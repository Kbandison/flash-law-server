const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const chatSchema = new mongoose.Schema({
  id: { type: String, default: uuidv4 },
  customer: String,
  attorney: String,
  log: [
    {
      by: String,
      sent: Date,
      message: String,
    },
  ],
  createdAt: { type: Date, default: Date.now },
  UpdatedAt: Date,
});

const Chat = mongoose.model("chats", chatSchema);

module.exports = Chat;
