import { Document } from "mongoose";
export interface User {
  avatarImg: string;
  name: string;
  password: string;
  email: string;
}

export interface UserModel extends User, Document {}

export interface UserInput
  extends Pick<User, "name" | "password" | "email" | "avatarImg"> {}

export interface LoginInput extends Pick<User, "email" | "password"> {}
