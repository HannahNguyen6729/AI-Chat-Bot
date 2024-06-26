import express from 'express';
import {
  loginValidator,
  signupValidator,
  validate,
} from '../utils/validator.js';
import {
  getAllUsersController,
  userLoginController,
  userLogoutController,
  userSignupController,
  verifyUserController,
} from '../controllers/userController.js';
import { verifyAccessToken } from '../utils/token.js';

const userRoutes = express.Router();

userRoutes.post('/signup', validate(signupValidator), userSignupController);
userRoutes.post('/login', validate(loginValidator), userLoginController);
userRoutes.get('/auth-status', verifyAccessToken, verifyUserController);
userRoutes.get('/', getAllUsersController);
userRoutes.get('/logout', verifyAccessToken, userLogoutController);

export default userRoutes;
