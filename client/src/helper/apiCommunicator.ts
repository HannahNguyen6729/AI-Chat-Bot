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
