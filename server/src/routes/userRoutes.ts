import express from 'express';
import { signupValidator, validate } from '../utils/validator.js';
import { useSignupController } from '../controllers/userController.js';

const userRoutes = express.Router();

userRoutes.post('/signup', validate(signupValidator), useSignupController);

export default userRoutes;
