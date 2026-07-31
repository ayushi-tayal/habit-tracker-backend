const router = require('express').Router();
const { login, register, me, resetPassword, update } = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', register);
router.post('/login', login);
router.post('/reset-password', resetPassword);
router.get('/me', authMiddleware, me);
router.patch('/update', update);

module.exports = router;
