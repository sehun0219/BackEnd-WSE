import { Request, Response } from "express";
import recipeService from "../services/recipeService";
import { Recipe, RecipeModel } from "../interface/Recipe";
import { CookingInfo, CookingStep, Ingredient } from "../models/recipe";
import { Step } from "../interface/Recipe";

export const createRecipes = async (req: Request, res: Response) => {
  try {
    req.body.ingredient = JSON.parse(req.body.ingredient);
    console.log(req.body);

    const files = JSON.parse(JSON.stringify(req.files));
    const info = req.body.cookingInfo.split(",");

    const recipeData = {
      userInfo: JSON.stringify({
        avatarImg: "",
        name: req.body.name,
        password: "",
        email: req.body.email,
      }),
      title: req.body.title,
      desc: req.body.desc,
      category: req.body.category,
      cookingInfo: new CookingInfo({
        servingSize: info[0],
        time: info[1],
        difficulty: info[2],
      }),
      mainImg: files.mainImg[0].filename,
      ingredient: req.body.ingredient.map((i: any) => new Ingredient(i)),
      cookingStep: req.body.cookingStepDesc.map(
        (i: any, index: number) =>
          new CookingStep({
            stepNum: index + 1,
            stepDesc: i,
            imgSrc: files.cookingStep[index].filename,
          })
      ),
      completedImgs: files.completedImgs.map((i: any) => i.filename),
      viewCount: 0,
    };
    const saveRecipe = await recipeService.create(recipeData);
    res.status(200).json(saveRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버에 문제가 발생했습니다." });
  }
};
