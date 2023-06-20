import { User } from "./User";
import { Review } from "./Review";
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
  userInfo: User;
  title: string;
  desc: string;
  category: string[];
  cookingInfo: string[];
  mainImg: string;
  ingredient: Ingredient[];
  stepList: Step[];
  completedImgs: string[];
  viewCount: number;
}

export interface RecipeModel extends Recipe, Document {}
