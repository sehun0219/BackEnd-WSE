import { RecipeModel } from "../models/recipe";
import { Recipe } from "../interface/Recipe";

const create = async (recipeInput: Recipe) => {
  try {
    const recipe = new RecipeModel(recipeInput);
    await recipe.save();
    return recipe;
  } catch (error) {
    console.error("recipeCreate", error);
    throw new Error("Failed to create recipe");
  }
};

export default {
  create,
};
