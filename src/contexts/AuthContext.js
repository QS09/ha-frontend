import { CreateContext, useState } from 'react';

const initialValues = {
  isLoggedIn: false,
  login: () => {},
  register: () => {},
  logout: () => {},
};
export const AuthContext = CreateContext(initialValues);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (payload) => {};

  const register = async (payload) => {};

  const logout = () => {};

  return (
    <AuthContext.AuthProvider value={{ isLoggedIn, login, register, logout }}>
      {children}
    </AuthContext.AuthProvider>
  );
};
