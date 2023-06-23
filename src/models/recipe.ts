import mongoose, { Schema } from "mongoose";

const cookingStepSchema = new mongoose.Schema({
  imgSrc: String,
  stepDesc: String,
  stepNum: Number,
});

const cookingInfoSchema = new mongoose.Schema({
  servingSize: String,
  time: String,
  difficulty: String,
});

const ingredientSchema = new mongoose.Schema({
  ingredient: String,
  quantity: String,
});

const recipeSchema = new mongoose.Schema({
  userInfo: String,
  title: String,
  desc: String,
  category: String,
  cookingInfo: cookingInfoSchema,
  mainImg: String,
  ingredient: [ingredientSchema],
  cookingStep: [cookingStepSchema],
  completedImgs: [String],
});

const recipeCountSchema = new Schema({
  title: String,
  viewCount: { type: Number, default: 0 },
});

export const Recipe = mongoose.model("Recipe", recipeSchema);
export const Ingredient = mongoose.model("Ingredient", ingredientSchema);
export const CookingStep = mongoose.model("cookingStep", cookingStepSchema);
export const CookingInfo = mongoose.model("cookingInfo", cookingInfoSchema);
export const ViewCount = mongoose.model("viewCount", recipeCountSchema);
