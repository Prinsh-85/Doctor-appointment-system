const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  email: { type: String, unique: true },
  experience: Number, // in years
  phone: String,
  availableSlots: [String] // e.g., ["10:00 AM", "2:00 PM"]
});

module.exports = mongoose.model("Doctor", doctorSchema);
