import React, { createContext, useEffect } from "react";
import { UserServices } from "../api/services/user";
import { User } from "../shared/interface/user";
import { getUserFromJWT } from "../shared/common/auth";

interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => void;
  register?: (user: User) => void;
}

export const AuthContext = createContext<AuthContextProps>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = React.useState<User | null>(null);

  const login = async (email: string, password: string) => {
    const user = await UserServices.login(email, password);
    setUser(user);
  };

  const register = (user: User) => {
    setUser(user);
  };

  const verifyAuth = () => {
    const token = localStorage.getItem("accessToken");
    const user = getUserFromJWT(token);
    if (user) {
      setUser(user);
    }
  };

  useEffect(() => {
    verifyAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};
