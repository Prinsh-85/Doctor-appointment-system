const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Book appointment
router.post('/book', async (req, res) => {
  const { doctorId, patientName, patientEmail, slot, date } = req.body;

  try {
    const newAppointment = new Appointment({
      doctorId,
      patientName,
      patientEmail,
      slot,
      date
    });

    await newAppointment.save();
    res.status(201).json({ msg: 'Appointment booked successfully' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ✅ GET all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('doctorId');
    res.json(appointments);
  } catch (err) {
    console.error("Error fetching appointments:", err);
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;