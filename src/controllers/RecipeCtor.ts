import { Request, Response } from "express";
import recipeService from "../services/recipeService";
import {
  CookingInfo,
  CookingStep,
  Ingredient,
  ViewCount,
} from "../models/recipe";

export const createRecipes = async (req: Request, res: Response) => {
  try {
    req.body.ingredient = JSON.parse(req.body.ingredient);

    const files = JSON.parse(JSON.stringify(req.files));
    const info = req.body.cookingInfo.split(",");

    const recipeData = {
      userInfo: JSON.stringify({
        avatarImg: req.body.avatarImg,
        name: req.body.name,
        password: "",
        email: req.body.email,
      }),
      name: req.body.name,
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
    res.status(500).json({ message: "server error" });
  }
};

export const readRecipes = async (req: Request, res: Response) => {
  const recipeList = await recipeService.read();
  res.send(recipeList);
};

export const readRecipeDetail = async (req: Request, res: Response) => {
  const detail = await recipeService.readDetail(req.query.id);
  res.send(detail);
};

export const readViewCount = async (req: Request, res: Response) => {
  try {
    const recipe = await ViewCount.findById(req.params._id);
    console.log("1111", req.params);
    if (!recipe) {
      res.status(404).send("Recipe not found");
    } else {
      recipe.viewCount += 1;
      await recipe.save();
      res.send(recipe);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

export const readSearchRecipes = async (req: Request, res: Response) => {
  const search = await recipeService.readSearch(req.query.keyword);
  res.send(search);
};
