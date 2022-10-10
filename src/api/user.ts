import { AuthUser, User } from '../interface/user';
import { AxiosServices } from './axios';

export const UserServices = {
  login: async (email: string, password: string): Promise<User> => {
    const user = await AxiosServices.post<AuthUser>('/auth/login', { email, password });
    localStorage.setItem('accessToken', user.accessToken);
    localStorage.setItem('refreshToken', user.refreshToken);
    return user;
  },

  register: async (email: string, password: string, firstName: string, lastName: string): Promise<User> => {
    const user = await AxiosServices.post<User>('auth/register', { email, password, firstName, lastName });
    return user;
  },
};
