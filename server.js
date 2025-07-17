const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.log('❌ DB Error:', err));

// ROUTES
const appointmentRoutes = require('./routes/appointment');
app.use('/api/appointments', appointmentRoutes);

const doctorRoutes = require('./routes/doctor');  // ✅ Important
app.use('/api/doctors', doctorRoutes);           // ✅ Must come AFTER import

// Test root route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
