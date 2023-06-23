import { Router } from "express";
import { signUp, login, profile, liked } from "../controllers/UserCtor";
import multer from "multer";
const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/AvatarImg");
    },
    filename: function (req, file, cb) {
      const email = req.body.email;
      const fileName = decodeURIComponent(email + ".png");
      console.log(fileName);
      cb(null, fileName);
    },
  }),
  limits: {
    fileSize: 100 * 1024 * 1024, // 10MB
  },
});

router.post("/sign-up", upload.single("avatarImg"), signUp);
router.post("/login", login);
router.get("/liked", liked);

export default router;
