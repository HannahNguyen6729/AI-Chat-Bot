import express from 'express';
import { signupValidator, validate } from '../utils/validator.js';

const userRoutes = express.Router();

userRoutes.post('/signup', validate(signupValidator), () => {});

export default userRoutes;
