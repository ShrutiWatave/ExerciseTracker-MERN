const router = require('express').Router();
let Exercise = require('../models/exercise.model')

//Route for getting all exercises in the db
router.route('/').get((req, res) => {
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Route for adding exercises in the db
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date
    });

    newExercise.save()
        .then(() => res.json('Exercise is added.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Route for getting exercises of a particular id of the user in db
router.route('/:id').get((req, res) => {    //:id is a variable
    Exercise.findById(req.params.id)    //Find the exercises by the user id in the URL
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Route for updating exercises of a particular id of the user in db
router.route('/update/:id').post((req, res) => {
    Exercise.findByIdAndUpdate(req.params.id)
        .then(exercise => {
            //Updating the exercise of the user found by id with the new fields 
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            //Saving the updated user
            exercise.save()
                .then(() => res.json("Exercise is updated."))
                .catch(err => res.status(400).json('Error:' + err));
        })

        .catch(err => res.status(400).json('Error: ' + err));
});

//Route for deleting a exercise by user id
router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise is deleted.'))
        .catch(err => { res.status(400).json('Error: ' + err) });
})
module.exports = router;
