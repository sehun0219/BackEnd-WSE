"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserCtor_1 = require("../controllers/UserCtor");
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
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
router.post("/sign-up", upload.single("avatarImg"), UserCtor_1.signUp);
router.post("/login", UserCtor_1.login);
router.get("/liked", UserCtor_1.liked);
exports.default = router;
