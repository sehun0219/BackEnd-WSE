import mongoose from "mongoose";

const cookingStepSchema = new mongoose.Schema({
  imgScr: String,
  stepDesc: String,
  id: Number,
});

const cookingInfoSchema = new mongoose.Schema({
  servingSize: String,
  Time: String,
  Difficulty: String,
});

const ingredientSchema = new mongoose.Schema({
  name: String,
  quantity: String,
});

const compImgSchema = new mongoose.Schema({
  url: String,
});

const recipeSchema = new mongoose.Schema({
  userInfo: Object,
  title: String,
  desc: String,
  category: String,
  cookingIfo: [cookingInfoSchema],
  mainImg: String,
  ingredient: [ingredientSchema],
  cookingStep: [cookingStepSchema], // 각 요리 단계를 위한 별도의 스키마를 사용합니다.
  completedImgs: [compImgSchema], // 완성된 요리의 이미지 URL 배열
});

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
