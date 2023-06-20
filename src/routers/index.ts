import { Router, Request, Response } from "express";
import userRouter from "./user";
import recipeRouter from "./recipe";
const router = Router();

router.use("/user", userRouter);
router.use("/recipe", recipeRouter);
export default router;
