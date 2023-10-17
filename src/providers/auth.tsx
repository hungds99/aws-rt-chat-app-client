import React, { createContext, useEffect } from "react";
import { UserServices } from "../api/services/user";
import { getUserFromJWT } from "../shared/common/auth";
import { User } from "../shared/interface/user";

interface AuthContextProps {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register?: (user: User) => void;
}

export const AuthContext = createContext<AuthContextProps>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const login = async (email: string, password: string) => {
    const user = await UserServices.login(email, password);
    setUser(user);
  };

  const register = (user: User) => {
    setUser(user);
  };

  const verifyAuth = () => {
    setIsLoading(true);
    const token = localStorage.getItem("accessToken");
    const user = getUserFromJWT(token);
    if (user) {
      setUser(user);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    verifyAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
