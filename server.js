const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

// Express Server
const app = express();
const port = process.env.PORT || 5000;

// DB connection
const uri = process.env.ATLAS_URI; // MongoDB connection string
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
// When connection opens
connection.once('open', () => {
    console.log("MongoDB connection established SUCSESSFULLY")
})

// Middlewares
app.use(cors()); // Cors Middleware
app.use(express.json()); // Express JSON middleware

// Router to corresponding routes
const exerciseRouter = require('./routes/exercise');
const userRouter = require('./routes/user');

// Make app use Routes
app.use('/exercises', exerciseRouter);
app.use('/users', userRouter);

// Listen to the server
app.listen(port, () => {
    console.log(`Server is running at ${port}`)
})