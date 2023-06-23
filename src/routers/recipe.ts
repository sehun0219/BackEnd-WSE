import { Router } from "express";
import multer from "multer";
import {
  createRecipes,
  readRecipes,
  getViewCount,
  readRecipeDetail,
  readSearchRecipes,
} from "../controllers/RecipeCtor";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    const fileName = req.body.title + "_" + file.originalname;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

const router = Router();
router.put(
  "/add",
  upload.fields([
    { name: "mainImg", maxCount: 1 },
    { name: "cookingStep", maxCount: 30 },
    { name: "completedImgs", maxCount: 4 },
  ]),
  createRecipes
);

router.get("/list", readRecipes);
router.get("/detail", readRecipeDetail);
router.get("/search", readSearchRecipes);

export default router;
