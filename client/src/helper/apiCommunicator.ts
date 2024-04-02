import { axiosInstance } from '../config/axiosConfig';

export const loginUser = async (email: string, password: string) => {
  const res = await axiosInstance.post('/user/login', { email, password });
  if (res.status !== 200) {
    throw new Error('Unable to login');
  }
  const data = await res.data;
  return data;
};

export const checkAuthStatus = async () => {
  const res = await axiosInstance.get('/user/auth-status');
  if (res.status !== 200) {
    throw new Error('Unable to authenticate user');
  }
  const data = await res.data;
  return data;
};

export const sendChatRequest = async (message: string) => {
  const res = await axiosInstance.post('/chat/new', { message });
  if (res.status !== 200) {
    throw new Error('Unable to send chat');
  }
  const data = await res.data;
  return data;
};

export const getUserChats = async () => {
  const res = await axiosInstance.get('/chat/all-chats');
  if (res.status !== 200) {
    throw new Error('Unable to send chat');
  }
  const data = await res.data;
  return data;
};

export const deleteUserChats = async () => {
  const res = await axiosInstance.delete('/chat/delete');
  if (res.status !== 200) {
    throw new Error('Unable to delete chats');
  }
  const data = await res.data;
  return data;
};
