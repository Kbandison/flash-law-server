const Attorney = require("../models/attorneySchema");
const attorneyList = require("../attorney.json");

// GET ATTORNEYS
const getAttorneys = async (req, res) => {
  try {
    const attorneys = await Attorney.find();
    res.json({ count: attorneys.length, attorneys });
  } catch (error) {
    res.json({ message: error });
  }
};

// GET ATTORNEY BY ID
const getAttorney = async (req, res) => {
  try {
    const attorney = await Attorney.findOne({ id: req.params.id });

    res.json({ attorney });
  } catch (error) {
    res.json({ message: error });
  }
};

// CREATE ATTORNEY
const newAttorney = async (req, res) => {
  try {
    let newAttorney;

    for (let attorney of attorneyList) {
      newAttorney = new Attorney({
        firstName: attorney.name.split(" ")[0],
        lastName: attorney.name.split(" ")[1],
        experience_length: attorney["experience-length"],
        education: attorney.education,
        specialty: attorney["practice-specialty"],
        areas_of_experience: attorney["practice-areas"],
        achievements: attorney.achievements,
        summary: attorney.summary,
        photo: attorney.photo,
        assigned_users: [],
      });

      await Attorney.create(newAttorney);
    }
    res.json({
      success: true,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE ALL ATTORNEYS
const deleteAttorneys = async (req, res) => {
  try {
    await Attorney.deleteMany();
    res.json({ success: true });
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = {
  getAttorney,
  getAttorneys,
  newAttorney,
  deleteAttorneys,
};
