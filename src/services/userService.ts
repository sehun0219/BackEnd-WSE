import User from "../models/user";
import { UserInput } from "../interface/User";

// 회원정보 생성
const create = async ({ name, profileImg, password, email }: UserInput) => {
  try {
    const user = new User({ name, profileImg, password, email });
    await user.save();
    return user;
  } catch (error) {
    console.error("userCreate", error);
    throw new Error("User already exists");
  }
};

export default {
  create,
};
