import express from 'express';
const router = express.Router();
import { login, signUp, deleteUser, readAllUsers } from '../controller/authUsersController.js';
import auth from '../middleware/authMiddleware.js';
import { loginLimiter } from '../middleware/rateLimiter.js';


router.get('/users', auth, readAllUsers); //
router.post('/signup', auth, signUp); // 
router.post('/login', loginLimiter, login); //
router.delete('/delete/:id', auth, deleteUser)

export default router;