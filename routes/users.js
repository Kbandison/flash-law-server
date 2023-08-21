var express = require("express");
var router = express.Router();
const {
  getUsers,
  getUser,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  deleteAllUsers,
} = require("../controllers/usersController");

/*****************USER ROUTES****************/
router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/update-user/:id", updateUser);
router.delete("/delete-user/:id", deleteUser);
router.delete("/delete-all-users", deleteAllUsers);

/*****************AUTH ROUTES****************/
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
