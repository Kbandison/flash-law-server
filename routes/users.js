var express = require("express");
var router = express.Router();
const {
  getUsers,
  getUser,
  registerUser,
} = require("../controllers/usersController");

/* GET users listing. */
router.get("/", getUsers);
router.post("/register", registerUser);

module.exports = router;
