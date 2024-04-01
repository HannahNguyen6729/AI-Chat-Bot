import { Configuration } from 'openai';

export const configurationOpenAI = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
