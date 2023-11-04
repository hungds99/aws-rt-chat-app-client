import jwt_decode from 'jwt-decode';
import { User } from '../interface/user.js';

export const getUserFromJWT = (token: string | null): User | null => {
  if (!token) {
    return null;
  }
  const tokenDecoded: any = jwt_decode(token);
  if (tokenDecoded.exp < Date.now() / 1000) {
    return null;
  }
  return tokenDecoded as User;
};
