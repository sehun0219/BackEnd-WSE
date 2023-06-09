import mongoose from "mongoose";
import { UserModel } from "../interface/User";

const UserSchema = new mongoose.Schema<UserModel>({
  profileImg: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
  },
  name: {
    type: String,
    unique: true, // 중복확인
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model<UserModel>("User", UserSchema);
