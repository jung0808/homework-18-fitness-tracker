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
      // console.log(data);
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

//post
router.post("/api/workouts", async (req, res) => {
  try {
    const { body } = req;
    const newWorkout = await Workout.create(body);
    res.json(newWorkout);
  } catch (error) {
    res.json(error);
  }

  //   console.log("WORKOUT TO BE ADDED");
  //   console.log(body);

  //   Workout.create(body)
  //     .then((data) => {
  //       res.json(data);
  //     })
  //     .catch((err) => {
  //       res.json(err);
  //     });
});

router.put("/api/workouts/:id", async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  console.log(body)
  const updated = await Workout.updateOne(body, {
    where: {
      _id: id,
    },
    $push: {
      exercises: { $each: [...body] },
    },
  });
  if (updated) res.status(200).send(success)
});

//put
//#findbyid and update for put
// router.put("/api/workouts/:id", (req, res) => {
//   Workout.findOneAndUpdate(
//     { _id: req.params.id },
//     {
//       $inc: { totalDuration: req.body.duration },
//       $push: { exercises: req.body },
//     },
//     { new: true }
//   )
//     .then((dbWorkout) => {
//       res.json(dbWorkout);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });

//get for range #38 - #42 (The last 7 days workout)
// router.get("/api/workouts/range", (req, res) => {
//   Workout.find({})
//     .then((dbWorkout) => {
//       console.log("ALL WORKOUTS");
//       console.log(dbWorkout);

//       res.json(dbWorkout);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });

module.exports = router;
