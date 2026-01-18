// src/context/AuthContext.tsx
import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { register } from '../api/register';
import { login_raw } from '../api/login';


type User = { username: string } | null;

type AuthContextType = {
  user: User;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register:(username: string, email: string, password: string)=>any;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);

  const login = async (username: string, password: string) => {
    if (username && password) {
      setUser({ username });
      login_raw(username,password);
    } else {
      alert('Username or password incorrect.');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };


  return (
    <AuthContext.Provider value={{ user, login, logout,register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used in AuthProvider.');
  return ctx;
};