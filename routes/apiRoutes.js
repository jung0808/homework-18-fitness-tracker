const router = require("express").Router();
const Workout = require("../models/workout");

//Get Routes
router.get("/api/workouts", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration",
        },
      },
    },
  ])
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

//post

//put
//#findbyid and update for post

//get for range #38 - #42 (The last 7 days workout)

module.exports = router;
