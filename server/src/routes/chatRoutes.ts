import express from 'express';
import { chatCompletionValidator, validate } from '../utils/validator.js';
import { verifyAccessToken } from '../utils/token.js';
import {
  deleteChatsController,
  generateChatCompletionController,
  getAllChatsController,
} from '../controllers/chatController.js';

const chatRoutes = express.Router();

chatRoutes.post(
  '/new',
  validate(chatCompletionValidator),
  verifyAccessToken,
  generateChatCompletionController
);

chatRoutes.get('/all-chats', verifyAccessToken, getAllChatsController);
chatRoutes.delete('/delete', verifyAccessToken, deleteChatsController);

export default chatRoutes;
