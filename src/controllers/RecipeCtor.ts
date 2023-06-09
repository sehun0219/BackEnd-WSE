import { Request, Response } from "express";
import recipeService from "../services/recipeService";

export const createRecipes = async (req: Request, res: Response) => {
  try {
    // console.log(req.body);
    console.log(req.files);
    const files = Array.isArray(req.files) ? req.files : [];
    const creator = req.body.creator;
    const title = req.body.title;
    const desc = req.body.desc;
    const category = req.body.category.split(", ");
    const cookingInfo = req.body.cookingInfo.split(", ");
    const cookingTip = req.body.cookingTip;
    const stepList = req.body.stepList;
    const ingredientList = req.body.ingredientList;

    const mainImg = files.find(
      (file: Express.Multer.File) => file.fieldname === "mainImg"
    );
    const completedImgs = files.filter((file: Express.Multer.File) =>
      file.fieldname.startsWith("completedImgs")
    );

    const recipeInput = {
      creator,
      title,
      desc,
      category,
      cookingInfo,
      cookingTip,
      mainImg: mainImg?.path || "",
      ingredientList,
      stepList: stepList.map((step: any, index: number) => ({
        ...step,
        imgSrc: files.find(
          (file: Express.Multer.File) =>
            file.fieldname === `stepImages_${index}`
        )?.path,
      })),
      completedImgs: completedImgs.map((img: Express.Multer.File) => img.path),
      viewCount: 0,
    };

    const newRecipe = await recipeService.create(recipeInput);

    res.status(201).json(newRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버에 문제가 발생했습니다." });
  }
};
