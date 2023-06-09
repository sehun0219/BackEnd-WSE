import { Document } from "mongoose";
export interface User {
  profileImg: string;
  name: string;
  password: string;
  email: string;
}

export interface UserModel extends User, Document {}
export interface UserInput extends Pick<User, "name" | "password" | "email"> {
  profileImg?: string;
}
export interface LoginInput extends Pick<User, "email" | "password"> {}
