const router = require('express').Router();
const { getCoreHabits, getAllHabitCategories } = require('../controllers/habit.controller');
const { add_user_habit, get_user_habit } = require('../controllers/user_habit.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware, getCoreHabits);
router.get('/categories', authMiddleware, getAllHabitCategories);
router.post('/add_user_habit', authMiddleware, add_user_habit);
router.get('/user_habits/:userId', authMiddleware, get_user_habit);

module.exports = router;
