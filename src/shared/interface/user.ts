export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  type: "USER";
};

export type UserLogin = Pick<User, "email"> & { password: string };
export type UserRegister = Pick<User, "email" | "firstName" | "lastName"> & {
  password: string;
};
export type AuthUser = User & { accessToken: string; refreshToken: string };
