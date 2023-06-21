import mongoose from "mongoose";

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
  cookingStep: [cookingStepSchema], // 각 요리 단계를 위한 별도의 스키마를 사용합니다.
  completedImgs: [String], // 완성된 요리의 이미지 URL 배열
});

export const Recipe = mongoose.model("Recipe", recipeSchema);
export const Ingredient = mongoose.model("Ingredient", ingredientSchema);
export const CookingStep = mongoose.model("cookingStep", cookingStepSchema);
export const CookingInfo = mongoose.model("cookingInfo", cookingInfoSchema);
