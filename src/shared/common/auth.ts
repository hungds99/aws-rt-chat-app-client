import jwt_decode from 'jwt-decode';
import { User } from '../interface/user';

export const getUserFromJWT = (token: string | null): User | null => {
  if (!token) return null;
  const user = jwt_decode(token) as User;
  return user;
};
