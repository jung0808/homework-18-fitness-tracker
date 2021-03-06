const router = require("express").Router();
const Workout = require("../models/workout");

router
  .get("/api/workouts", async (req, res) => {
    try {
      const workouts = await Workout.aggregate([
        {
          $addFields: {
            totalDuration: {
              $sum: "$exercises.duration",
            },
          },
        },
      ]);
      res.json(workouts);
    } catch (error) {
      res.json(error);
    }
  })
  .post("/api/workouts", async (req, res) => {
    try {
      const { body } = req;
      const newWorkout = await Workout.create(body);
      res.json(newWorkout);
    } catch (error) {
      res.json(error);
    }
  })
  .put("/api/workouts/:id", async (req, res) => {
    try {
      const { body } = req;
      const { id } = req.params;
      await Workout.findByIdAndUpdate(id, {
        $push: {
          exercises: body,
        },
      });
      res.status(200).json({ data: "success" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ data: error });
    }
  })
  .get("/api/workouts/range", async (req, res) => {
    try {
      const today = new Date(Date.now());
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const range = await Workout.find({
        day: {
          $gte: sevenDaysAgo,
          $lte: today,
        },
      });
      const response = range.map((workout, i) => {
        const { id, day, exercises } = workout;
        const withTotalDuration = {
          id,
          day,
          exercises,
          totalDuration: workout.exercises.reduce(
            (acc, cur) => acc + cur.duration,
            0
          ),
        };
        return withTotalDuration;
      });
      res.json(response);
    } catch (error) {
      res.json(error);
    }
  });

module.exports = router;
