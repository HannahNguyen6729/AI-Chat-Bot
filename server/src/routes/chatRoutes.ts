import express from 'express';
import { chatCompletionValidator, validate } from '../utils/validator.js';
import { verifyAccessToken } from '../utils/token.js';
import { generateChatCompletionController } from '../controllers/chatController.js';

const chatRoutes = express.Router();
chatRoutes.post(
  '/new',
  validate(chatCompletionValidator),
  verifyAccessToken,
  generateChatCompletionController
);

export default chatRoutes;
