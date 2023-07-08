import { Router } from "express";
import userRouter from "./user";
import recipeRouter from "./recipe";

const router = Router();

router.use("/user", userRouter);
router.use("/recipe", recipeRouter);
router.use("/ping", (req, res) => {
  res.send("pong");
});

export default router;
