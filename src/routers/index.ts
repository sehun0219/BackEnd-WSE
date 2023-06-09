import { Router, Request, Response } from "express";
import userRouter from "./user";
import recipeRouter from "./recipe";
const router = Router();

router.get("/ping", (req: Request, res: Response) => {
  res.send("pong");
});
router.use("/user", userRouter);
router.use("/recipe", recipeRouter);
export default router;
