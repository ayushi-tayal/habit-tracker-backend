const UserHabit = require("../models/user_habit.model.js");

async function add_user_habit(req, res) {
  try {
    const data = req.body;
    const newHabit = new UserHabit({ habitIds: data.habitIds, userId: data.userId, status: data.status });
    const savedHabit = await newHabit.save();
    return res.status(201).json(savedHabit);
  } catch (error) {
    console.log("Something went wrong, try again later", error);
    return res.status(500).json({
      message: `Something went wrong, try again later: ${error.message}`,
    });
  }
}

async function update_user_habit(req, res) {
  try {
    const data = req.body;
    const updatedHabit = await UserHabit.findOneAndUpdate(
      { userId: data.userId },
      { habitIds: data.habitIds, status: data.status },
      { new: true }
    );
    return res.json(updatedHabit);
  } catch (error) {
    console.log("Something went wrong, try again later", error);
    return res.status(500).json({
      message: `Something went wrong, try again later: ${error.message}`,
    });
  }
}

async function get_user_habit(req, res) {
  try {
    const userId = req.params.userId;
    const userHabits = await UserHabit.find({ userId });
    return res.json(userHabits);
  } catch (error) {
    console.log("Something went wrong, try again later", error);
    return res.status(500).json({
      message: `Something went wrong, try again later: ${error.message}`,
    });
  }
}

module.exports = { add_user_habit, get_user_habit, update_user_habit };