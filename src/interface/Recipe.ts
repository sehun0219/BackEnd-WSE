import { User } from "./User";
import { Review } from "./Review";
import { Document } from "mongoose";

export interface Ingredient {
  ingredient: string;
  quantity: string;
}

export interface Step {
  stepDesc: string;
  imgSrc: string;
}

export interface Recipe {
  creator: User;
  title: string;
  desc: string;
  category: string[];
  cookingInfo: string[];
  cookingTip?: string;
  mainImg: string;
  ingredientList: Ingredient[];
  stepList: Step[];
  completedImgs: string[];
  reviews?: Review[];
  viewCount: number;
}

export interface RecipeModel extends Recipe, Document {}
