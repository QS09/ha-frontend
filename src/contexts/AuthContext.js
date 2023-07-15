import { createContext, useState } from 'react';
import moment from 'moment';
import { authApi } from '@/services/auth';

const initialValues = {
  isLoggedIn: false,
  user: null,
  login: async () => Promise.resolve(),
  register: async () => Promise.resolve(),
  logout: async () => Promise.resolve(),
};
export const AuthContext = createContext(initialValues);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const login = async (payload) => {
    const token = await authApi.login(payload);
    globalThis.localStorage.setItem('accessToken', token.access);
    globalThis.localStorage.setItem('refreshToken', token.refresh);
    setIsLoggedIn(true);
  };

  const register = async (payload) => {
    const body = {
      first_name: payload.firstName,
      last_name: payload.lastName,
      date_of_birth: moment(payload.dateOfBirth).format('YYYY-MM-DD'),
      age: payload.age,
      username: payload.email,
      password: payload.password,
    };
    const { ok } = await authApi.register(body);
    if (!ok) throw new Error('User registration failed!');
  };

  const logout = () => {};

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
