require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require('./routes/fitness');

const app = express();
// Create PORT
const PORT = process.env.PORT || 8000;


//Connection to Database
mongoose.connect(process.env.MONGO_URI)
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
app.get('/', (req,res) => {
  res.send("HELLO WORLD")
});
app.use('/api', routes);

app.listen(PORT, () => {
    console.log('Connected to PORT ' + PORT)
  });
