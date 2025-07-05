require("dotenv").config();  // Load environment variables at the very top
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const apiRoutes = require('./router/router');  // Import the API routes

const app = express();
const port = process.env.PORT || 8802;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', apiRoutes);
// Log the Mongo URI to check if it's loaded correctly

// Check if the MONGO_URI exists
if (!process.env.MONGO_URI) {
  console.error("Mongo URI is not defined in .env file.");
} else {
  mongoose.connect(process.env.MONGO_URI)  // Use the URI from .env
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));
}

// // API Routes
// app.use('/api', apiRoutes);  // Attach the router at the /api prefix

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
