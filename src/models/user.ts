import mongoose from "mongoose";
import { UserModel } from "../interface/User";

const UserSchema = new mongoose.Schema<UserModel>({
  avatarImg: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    unique: true,
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
