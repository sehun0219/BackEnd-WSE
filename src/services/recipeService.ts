import Recipe from "../models/recipe";
import { RecipeModel } from "../interface/Recipe";

const create = async (recipeData: RecipeModel) => {
  try {
    const recipe = new Recipe(recipeData);
    await recipe.save();
    console.log("1111", typeof recipe);
    return recipe;
  } catch (error) {
    console.error("recipeCreate", error);
    throw new Error("Recipe creation failed");
  }
};

export default {
  create,
};
