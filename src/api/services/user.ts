import { AuthUser, User } from "../../shared/interface/user";
import axiosClient from "../axios";

export const UserServices = {
  login: async (email: string, password: string): Promise<User> => {
    const user = await axiosClient.post<AuthUser, any>("/auth/login", {
      email,
      password,
    });
    localStorage.setItem("accessToken", user.accessToken);
    localStorage.setItem("refreshToken", user.refreshToken);
    return user;
  },

  register: async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Promise<User> => {
    const user = await axiosClient.post<User, any>("auth/register", {
      email,
      password,
      firstName,
      lastName,
    });
    return user;
  },
};
