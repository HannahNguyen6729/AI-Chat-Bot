import { Request, Response } from 'express';
import { ChatCompletionRequestMessage, OpenAIApi } from 'openai';
import User from '../models/User.js';
import { configurationOpenAI } from '../config/openAiConfig.js';

export const generateChatCompletionController = async (
  req: Request,
  res: Response
) => {
  try {
    const { message } = req.body;

    const user = await User.findById(res.locals.jwtData.userId);
    if (!user)
      return res
        .status(401)
        .json({ message: 'user not found or token malfunctioned' });

    //get all chats of the user
    const chats = user.chats.map((chat) => ({
      role: chat.role,
      content: chat.content,
    })) as ChatCompletionRequestMessage[];

    const updatedChats = [
      ...chats,
      { role: 'user', content: message },
    ] as ChatCompletionRequestMessage[];

    user.chats.push({ role: 'user', content: message });

    // send all chats  with the new one to openAI API
    const openAi = new OpenAIApi(configurationOpenAI);

    const chatResponse = await openAi.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: updatedChats,
    });

    user.chats.push(chatResponse.data.choices[0].message);
    await user.save();
    return res
      .status(200)
      .json({ message: 'Chat completion was successfully', chats: user.chats });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: 'error', error: err });
  }
};
