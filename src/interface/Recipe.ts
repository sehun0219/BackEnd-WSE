import { User } from "./User";
import { Document } from "mongoose";

export interface Ingredient {
  ingredient: string;
  quantity: string;
}

export interface Step {
  stepNum: number;
  stepDesc: string;
  imgSrc: string;
}

export interface Recipe {
  userInfo: string;
  title: string;
  desc: string;
  category: string;
  cookingInfo: Document;
  mainImg: string;
  ingredient: Ingredient[];
  stepList: Document[];
  completedImgs: string[];
  viewCount: number;
}

export interface RecipeModel extends Recipe {}
