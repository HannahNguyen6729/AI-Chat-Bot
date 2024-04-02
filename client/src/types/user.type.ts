export type User = {
  name: string;
  email: string;
};
export type Message = {
  role: 'user' | 'assistant';
  content: string;
};
