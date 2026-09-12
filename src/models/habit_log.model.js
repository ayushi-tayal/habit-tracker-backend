const mongoose = require("mongoose");

const habitLogSchema = new mongoose.Schema(
  {
    completed_habits: {
      type: [String],
      required: true,
      trim: true,
    },
    userId: {
      type: String,
      required: true,
    },
    date: {
      type: Number,
      required: true,
    },
    month: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    complete_date: {
      type: String,
      required: true,
    },
    day_of_week: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("HabitLog", habitLogSchema);
