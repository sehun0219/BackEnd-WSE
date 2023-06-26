"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const RecipeCtor_1 = require("../controllers/RecipeCtor");
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/");
    },
    filename: function (req, file, cb) {
        const fileName = req.body.name + "_" + file.originalname;
        cb(null, fileName);
    },
});
const upload = (0, multer_1.default)({ storage });
const router = (0, express_1.Router)();
router.put("/add", upload.fields([
    { name: "mainImg", maxCount: 1 },
    { name: "cookingStep", maxCount: 30 },
    { name: "completedImgs", maxCount: 4 },
]), RecipeCtor_1.createRecipes);
router.get("/list", RecipeCtor_1.readRecipes);
router.get("/detail", RecipeCtor_1.readRecipeDetail);
router.get("/search", RecipeCtor_1.readSearchRecipes);
router.get(":id", RecipeCtor_1.readViewCount);
exports.default = router;
