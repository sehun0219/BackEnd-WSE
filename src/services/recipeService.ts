import { Recipe, ViewCount } from "../models/recipe";
import { RecipeModel } from "../interface/Recipe";

const create = async (recipeData: any) => {
  try {
    console.log("레시피데이터 컨트롤러스에서 오는데이터", recipeData);
    const recipe = new Recipe(recipeData);
    console.log("데이터베이스에 저장되는 데이터:", recipe);
    await recipe.save();
    return recipe;
  } catch (error) {
    console.error("recipeCreate", error);
    throw new Error("Recipe creation failed");
  }
};

const read = async () => {
  try {
    const recipes = await Recipe.find({});
    return recipes;
  } catch (error) {
    console.error("read", error);
    throw new Error("Recipe read failed");
  }
};

const readDetail = async (id: any) => {
  try {
    const detail = await Recipe.find({ _id: id });
    return detail;
  } catch (error) {
    console.error("read", error);
    throw new Error("Detail read failed");
  }
};

const readSearch = async (keyword: any) => {
  try {
    const search = await Recipe.find({ title: { $regex: `.*${keyword}.*` } });
    return search;
  } catch (error) {
    console.error("read", error);
    throw new Error("search read failed");
  }
};

export default {
  create,
  read,
  readDetail,
  readSearch,
};
