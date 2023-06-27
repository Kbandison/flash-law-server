var express = require("express");
var router = express.Router();
const {
  getAttorneys,
  getAttorney,
  newAttorney,
  deleteAttorneys,
} = require("../controllers/attorneysController");

/* GET home page. */
router.get("/", getAttorneys);
router.post("/new-attorney", newAttorney);
router.delete("/delete-attorneys", deleteAttorneys);

module.exports = router;
