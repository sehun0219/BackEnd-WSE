import { Recipe } from "../models/recipe";
import { RecipeModel } from "../interface/Recipe";

const create = async (recipeData: any) => {
  try {
    console.log("00000000", recipeData);
    const recipe = new Recipe(recipeData);
    console.log("1111111:", recipe);
    await recipe.save();
    return recipe;
  } catch (error) {
    console.error("recipeCreate", error);
    throw new Error("Recipe creation failed");
  }
};

export default {
  create,
};
