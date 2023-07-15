import { createContext, useEffect, useState } from 'react';
import moment from 'moment';
import { authApi } from '@/services/auth';
import { userApi } from '@/services/users';

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

  useEffect(() => {
    const accessToken = globalThis.localStorage.getItem('accessToken');
    if (accessToken) {
      loadProfile();
    }
  }, []);

  const loadProfile = async () => {
    const { ok, data } = await userApi.profile();
    setUser(data);
    if (!ok) throw new Error('Profile loading failed!');
  };

  const login = async (payload) => {
    const body = {
      username: payload.email,
      password: payload.password,
    };
    const { ok, data } = await authApi.login(body);
    if (!ok) throw new Error('User login failed!');
    globalThis.localStorage.setItem('accessToken', data.access);
    globalThis.localStorage.setItem('refreshToken', data.refresh);
    setIsLoggedIn(true);
    await loadProfile();
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
