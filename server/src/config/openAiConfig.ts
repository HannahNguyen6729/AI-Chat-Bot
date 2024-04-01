import { Configuration } from 'openai';

export const configurationOpenAI = () => {
  const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  return config;
};
