import { Router } from "express";
import { signUp, login, profile } from "../controllers/UserCtor";
const router = Router();

router.post("/sign-up", signUp);
router.post("/login", login);
router.get("/profile", profile);

export default router;
