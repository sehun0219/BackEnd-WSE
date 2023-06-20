import { Request, Response } from "express";
import recipeService from "../services/recipeService";
import { Recipe } from "../interface/Recipe";

export const createRecipes = async (req: Request, res: Response) => {
  try {
    req.body.ingredient = JSON.parse(req.body.ingredient);
    let temp = JSON.parse(req.body.userInfo);
    temp = JSON.parse(temp);
    console.log(req.body);

    const recipeData = req.body;
    const saveRecipe = await recipeService.create(recipeData);
    res.status(200).json(saveRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버에 문제가 발생했습니다." });
  }
};
