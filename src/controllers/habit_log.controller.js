const HabitLog = require("../models/habit_log.model.js");

async function add_todays_habit_log(req, res) {
  try {
    const data = req.body.userHabitLogs;
    const newHabitlLog = new HabitLog({
      completed_habits: data.completed_habits,
      userId: data.userId,
      date: data.date,
      month: data.month,
      year: data.year,
      complete_date: data.complete_date,
      day_of_week: data.day_of_week,
    });

    const savedHabitLog = await newHabitlLog.save();
    return res.status(201).json(savedHabitLog);
  } catch (error) {
    console.log("Something went wrong, try again later", error);
    return res.status(500).json({
      message: `Something went wrong, try again later: ${error.message}`,
    });
  }
}

async function update_todays_habit_log(req, res) {
  try {
    const data = req.body;
    const updatedHabitLog = await HabitLog.findOneAndUpdate(
      { userId: data.userId },
      { completed_habits: data.completed_habits },
      { new: true },
    );
    return res.status(201).json(updatedHabitLog);
  } catch (error) {
    console.log("Something went wrong, try again later", error);
    return res.status(500).json({
      message: `Something went wrong, try again later: ${error.message}`,
    });
  }
}

async function get_todays_habit_log(req, res) {
  try {
    const userId = req.params.userId;
    const today = new Date();
    const complete_date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    const userHabitsLog = await HabitLog.findOne({ userId, complete_date });
    return res.status(200).json(userHabitsLog);
  } catch (error) {
    console.log("Something went wrong, try again later", error);
    return res.status(500).json({
      message: `Something went wrong, try again later: ${error.message}`,
    });
  }
}

async function get_all_habit_logs(req, res) {
  try {
    const userId = req.params.userId;
    const start_date = req.query.start_date;
    const end_date = req.query.end_date;
    const today = new Date();
    
    const userHabitsLog = await HabitLog.find({
      userId,
      complete_date: {
        $gte: start_date,
        $lte: end_date,
      },
    });
    return res.status(200).json(userHabitsLog);
  } catch (error) {
    console.log("Something went wrong, try again later", error);
    return res.status(500).json({
      message: `Something went wrong, try again later: ${error.message}`,
    });
  }
}

module.exports = {
  add_todays_habit_log,
  get_todays_habit_log,
  update_todays_habit_log,
  get_all_habit_logs,
};
