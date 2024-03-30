import express from 'express';
import userRoutes from './userRoutes.js';
import chatRoutes from './chatRoutes.js';

const appRouter = express.Router();

appRouter.use('/user', userRoutes);
appRouter.use('/chat', chatRoutes);
export default appRouter;
