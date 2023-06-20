import { Router } from "express";
import multer from "multer";
import { createRecipes } from "../controllers/RecipeCtor";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
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

export default router;
