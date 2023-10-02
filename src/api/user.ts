import { AuthUser, User } from "../shared/interface/user";
import { AxiosServices } from "./axios";

const axiosServices = AxiosServices.getInstance();

export const UserServices = {
  login: async (email: string, password: string): Promise<User> => {
    const user = await axiosServices.post<AuthUser>("/auth/login", {
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
    const user = await axiosServices.post<User>("auth/register", {
      email,
      password,
      firstName,
      lastName,
    });
    return user;
  },
};
