var express = require("express");
var router = express.Router();
const {
  getChat,
  getChats,
  newChat,
} = require("../controllers/chatsController");

/* GET users listing. */
router.get("/", getChats);
router.post("/new-chat/:id", newChat);

module.exports = router;
