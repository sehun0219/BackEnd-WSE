import { User } from "./User";
import { Document } from "mongoose";

export interface Review {
  rate: number;
  body?: string;
  createdAt: Date;
  user: User;
  img?: string;
}

export interface ReviewModel extends Review, Document {}
