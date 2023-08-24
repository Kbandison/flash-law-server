var express = require("express");
var router = express.Router();
const {
  getUsers,
  getUser,
  registerUser,
  loginUser,
  updateUser,
  addAttorney,
  deleteUser,
  deleteAllUsers,
} = require("../controllers/usersController");
const { auth } = require("../middleware/auth");

/*****************USER ROUTES****************/
router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/update-user/:id", updateUser);
router.put("/add-attorney/:id", addAttorney);
router.delete("/delete-user/:id", deleteUser);
router.delete("/delete-all-users", deleteAllUsers);

/*****************AUTH ROUTES****************/
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
