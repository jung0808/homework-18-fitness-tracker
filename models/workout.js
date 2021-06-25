const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutData = new Schema({
  day: {
    type: Date,
    default: () => new Date(),
  },

  exercises: [
    {
      type: {
        type: String,
        required: "Enter Type of Exercises",
      },
      name: {
        type: String,
        required: "Enter an exercise name",
      },
      duration: {
        type: Number,
        required: "Enter your duration",
      },
      weight: {
        type: Number,
      },
      reps: {
        type: Number,
      },
      sets: {
        type: Number,
      },
      distance: {
        type: Number,
      },
    },
  ],
});

const Workout = mongoose.model("Workout", WorkoutData);

module.exports = Workout;
