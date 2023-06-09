import { Request, Response } from "express";
import { isValidPassword } from "../util";
import { LoginInput, UserInput } from "../interface/User";
import userService from "../services/userService";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";

// 회원 가입 (signup)
export const signUp = async (req: Request, res: Response) => {
  try {
    const { name, password, profileImg, email }: UserInput = req.body;
    if (!name) {
      console.log(name);
      return res.status(400).send("Name is required");
    }
    if (!password) {
      console.log(password);
      return res.status(400).send("Password is required");
    }
    if (!isValidPassword(req.body.password)) {
      return res.status(400).send("Password is not valid");
    }

    // Password hashing
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const saveUser = await userService.create({
      name,
      password: hashedPassword,
      profileImg,
      email,
    });
    const token = jwt.sign({ userId: saveUser._id }, "userSecretKey", {
      expiresIn: "1h",
    });

    return res.status(200).json({ token, user: saveUser });
  } catch (error: any) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

// 로그 인
export const login = async (req: Request, res: Response) => {
  const { email, password }: LoginInput = req.body;
  try {
    // 1. find user by email
    const user = await User.findOne({ email });
    // 2. if user is not found, return error
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    // 3. if user exists, check if the password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }
    // 4. if all checks pass, create jwt token
    const token = jwt.sign({ userId: user._id }, "userSecretKey", {
      expiresIn: "1h",
    });
    // 5. send token to the client

    return res.status(200).json({ token, user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// 회원정보보기 (user information)
export const profile = (req: Request, res: Response) => {
  res.send("회원정보페이지");
};

export const user = (req: Request, res: Response) => {};

// 회원정보수정 (user edit)
export const userEdit = (req: Request, res: Response) => {};
// 회원삭제 (Remove user)
export const removeUser = (req: Request, res: Response) => {};
// 로그 아웃
export const logout = (req: Request, res: Response) => {};
