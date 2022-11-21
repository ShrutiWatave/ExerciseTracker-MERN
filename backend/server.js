//Importing everything we need
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

//Defining the variables
const app = express();
const port = process.env.PORT | 5000;

//Setting up the middleware
app.use(cors());
app.use(express.json());

//Connection with the db
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true
});

//Making sure the connection was successful
const db = mongoose.connection;
db.once("open", () => {
    console.log("Connected to db");
});

//Routing
const usersRouter = require('./routes/user');
const exercisesRouter = require('./routes/exercise');

app.use('/users', usersRouter);
app.use('/exercises', exercisesRouter);

//Creating the server and making it listen to the port variable
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});