import { Router } from "express";
import multer from "multer";
import { createRecipes } from "../controllers/RecipeCtor";

const upload = multer({ dest: "uploads/" });

const router = Router();
router.put("/add", upload.any(), createRecipes);

export default router;
