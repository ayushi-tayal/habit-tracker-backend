const Habits = require("../models/habit.model.js");
const HabitCategory = require("../models/habit_categories.model.js");

async function getCoreHabits(req, res) {
  try {
    const habits = await Habits.find({
      isActive: true,
    });
    if (!habits) {
      return res.status(404).json({ message: "Habits not found." });
    }

    return res.json(habits);
  } catch (error) {
    console.log("Something went wrong, try again later", error);
    return res.status(500).json({
      message: `Something went wrong, try again later: ${error.message}`,
    });
  }
}

async function getAllHabitCategories(req, res) {
  try {
    const categories = await HabitCategory.find({});
    if (!categories) {
      return res.status(404).json({ message: "Habit categories not found." });
    }

    return res.json(categories);
  } catch (error) {
    console.log("Something went wrong, try again later", error);
    return res.status(500).json({
      message: `Something went wrong, try again later: ${error.message}`,
    });
  }
}

module.exports = { getCoreHabits, getAllHabitCategories };
