import { createContext, useEffect, useState } from 'react';
import { User } from '../types/user.type';

type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const initialValue = null;
export const AuthContext = createContext<AuthContextType | null>(initialValue);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (email: string, password: string) => {};
  const signup = async (name: string, email: string, password: string) => {};
  const logout = async () => {};

  useEffect(() => {}, []);

  const value = {
    isLoggedIn,
    user,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
