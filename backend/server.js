const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require('../backend/routes/fitness');

const app = express();
// Create PORT
const PORT = process.env.PORT || 8000;


//Connection to Database
mongoose.connect('mongodb://127.0.0.1:27017/Fitness-Tracker')
    .then(() => console.log("MongoDB Connected!"))
    .catch((err) => {
        console.log("Could not connect to database : " + err);
      });

//Middleware - Plugin
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());

//Routes
app.use('/api', routes);

app.listen(PORT, () => {
    console.log('Connected to PORT ' + PORT)
  });
