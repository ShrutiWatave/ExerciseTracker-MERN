//Modifications to the db

const router = require('express').Router();
//Can also be: 
// const express = require('express');
// const route = express.Router();

let User = require('../models/user.model');

//Route for getting all the users in the db
router.route('/').get((req, res) => {
    User.find()     //Will return all the users in the db
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Route for adding users in the db
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const newUser = new User({
        username
    });

    newUser.save()
        .then(() => res.json("New user saved successfully"))
        .catch(err => res.json("Error: " + err))
})

module.exports = router;