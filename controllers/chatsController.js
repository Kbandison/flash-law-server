const Chat = require("../models/chatSchema");
const User = require("../models/userSchema");
const Attorney = require("../models/attorneySchema");

//GET CHATS
const getChats = async (req, res) => {
  try {
    const chats = await Chat.find();
    res.json({ chats: chats });
  } catch (error) {
    res.json({ message: error });
  }
};

// GET CHATS BY ID (OR USER)
const getChat = async (req, res) => {
  try {
    const chat = await Chat.findOne({ id: req.body.id });
    res.json({ chat });
  } catch (error) {
    res.json({ message: error });
  }
};

// CREATE NEW CHAT
const newChat = async (req, res) => {
  try {
    let { customer, attorney, log } = req.body;
    customer = await User.findOne({ _id: req.params.id });
    attorney = await Attorney.findOne({ id: req.body.id });

    let newChat = new Chat({
      customer: customer.firstName,
      attorney: attorney.firstName,
      log,
    });

    await Chat.create(newChat);

    res.status(200).json({
      newChat,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// ADD NEW MESSAGE
const addMessage = async (req, res) => {
  try {
    // FIGURE OUT HOW TO SAVE MESSAGES WITH THE CORRECT PERSON WHO SENT IT ATTACHED
    // ADD SECOND COLLECTIONS FOR THE ACTUAL MESSAGES, AND ATTACH CHAT ID TO EACH MESSAGE SENT ALONG WITH USER/ATTORNEY ID
    // ATTATCH REQ.USER/ATTORNEY.ID TO MESSAGE AND ADD IT TO LOG ARRAY
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = {
  getChat,
  getChats,
  newChat,
};
