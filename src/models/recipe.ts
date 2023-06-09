import mongoose, { Document, Schema } from "mongoose";
import { Recipe } from "../interface/Recipe";

interface RecipeDocument extends Recipe, Document {}

// Ingredient 스키마
const IngredientSchema = new Schema({
  ingredient: { type: String, required: true },
  quantity: { type: String, required: true },
});

// Step 스키마
const StepSchema = new Schema({
  stepDesc: { type: String, required: true },
  imgSrc: { type: String, required: true },
});

// Recipe 스키마
const RecipeSchema = new Schema({
  creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  desc: { type: String, required: true },
  category: { type: [String], required: true },
  cookingInfo: { type: [String], required: true },
  cookingTip: String,
  mainImg: { type: String, required: true },
  ingredientList: { type: [IngredientSchema], required: true },
  stepList: { type: [StepSchema], required: true },
  completedImgs: { type: [String], required: true },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  viewCount: { type: Number, default: 0 },
});

const RecipeModel = mongoose.model<RecipeDocument>("Recipe", RecipeSchema);

export { RecipeModel };
