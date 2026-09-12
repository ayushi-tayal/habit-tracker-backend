const router = require('express').Router();
const { getCoreHabits, getAllHabitCategories } = require('../controllers/habit.controller');
const { add_user_habit, get_user_habit, update_user_habit } = require('../controllers/user_habit.controller');
const { add_todays_habit_log, get_todays_habit_log, update_todays_habit_log, get_all_habit_logs } = require('../controllers/habit_log.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware, getCoreHabits);
router.get('/categories', authMiddleware, getAllHabitCategories);

router.post('/add_user_habit', authMiddleware, add_user_habit);
router.get('/user_habits/:userId', authMiddleware, get_user_habit);
router.patch('/update_user_habit', authMiddleware, update_user_habit);

router.post('/add_todays_habit_log', authMiddleware, add_todays_habit_log);
router.get('/todays_habits_log/:userId', authMiddleware, get_todays_habit_log);
router.patch('/update_todays_habit_log', authMiddleware, update_todays_habit_log);
router.get('/get_all_habit_logs/:userId', authMiddleware, get_all_habit_logs);

module.exports = router;
