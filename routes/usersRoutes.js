import express from 'express';
const router = express.Router();
import { login, signUp, deleteUser } from '../controller/authUsersController.js';
import auth from '../middleware/authMiddleware.js';
import { loginLimiter } from '../middleware/rateLimiter.js';


router.post('/signup', signUp);
router.post('/login', loginLimiter, login);
router.delete('/delete/:id', deleteUser)

export default router;