import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import userController from '../controller/userController.js';
const router = express.Router();

router.get('/profile', authMiddleware, userController.getUserData);

export default router;