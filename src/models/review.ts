import { ReviewModel } from "../interface/Review";
import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema<ReviewModel>({
  rate: {
    type: Number,
    required: true,
  },
  body: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  img: {
    type: String,
  },
});

export default mongoose.model<ReviewModel>("Review", ReviewSchema);
// db 이름 "Review"
