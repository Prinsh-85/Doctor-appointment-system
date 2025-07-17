const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

// Route to get all doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.json(doctors);
  } catch (err) {
    console.error("Error fetching doctors:", err.message);
    res.status(500).json({ msg: "Server Error: " + err.message });
  }
});

// Route to add a new doctor
router.post('/add', async (req, res) => {
  try {
    const { name, specialization, email, experience, phone, availableSlots } = req.body;
    const newDoctor = new Doctor({
      name,
      specialization,
      email,
      experience,
      phone,
      availableSlots
    });
    await newDoctor.save();
    res.status(201).json({ msg: "Doctor added successfully" });
  } catch (err) {
    console.error("Error adding doctor:", err.message);
    res.status(500).json({ msg: "Server Error: " + err.message });
  }
});

module.exports = router;