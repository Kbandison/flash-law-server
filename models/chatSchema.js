const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const chatSchema = new mongoose.Schema({
  // LOOK INTO DOING A USEEFFECT TO UPDATE STATE EVERY 5 SEC TO CHECK FOR NEW MESSAGES
  // THINK OF HOW YOU ADD A PRODUCT TO THE CART, OR TO WISHLIST
  id: { type: String, default: uuidv4 },
  customer: Object,
  attorney: Object,
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
