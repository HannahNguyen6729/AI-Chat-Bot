import express from 'express';
import {
  loginValidator,
  signupValidator,
  validate,
} from '../utils/validator.js';
import {
  userLoginController,
  userSignupController,
} from '../controllers/userController.js';

const userRoutes = express.Router();

userRoutes.post('/signup', validate(signupValidator), userSignupController);
userRoutes.post('/login', validate(loginValidator), userLoginController);

export default userRoutes;
