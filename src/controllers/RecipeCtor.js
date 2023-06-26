"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readSearchRecipes = exports.readViewCount = exports.readRecipeDetail = exports.readRecipes = exports.createRecipes = void 0;
const recipeService_1 = __importDefault(require("../services/recipeService"));
const recipe_1 = require("../models/recipe");
const createRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body.ingredient = JSON.parse(req.body.ingredient);
        const files = JSON.parse(JSON.stringify(req.files));
        const info = req.body.cookingInfo.split(",");
        const recipeData = {
            userInfo: JSON.stringify({
                avatarImg: req.body.avatarImg,
                name: req.body.name,
                password: "",
                email: req.body.email,
            }),
            name: req.body.name,
            title: req.body.title,
            desc: req.body.desc,
            category: req.body.category,
            cookingInfo: new recipe_1.CookingInfo({
                servingSize: info[0],
                time: info[1],
                difficulty: info[2],
            }),
            mainImg: files.mainImg[0].filename,
            ingredient: req.body.ingredient.map((i) => new recipe_1.Ingredient(i)),
            cookingStep: req.body.cookingStepDesc.map((i, index) => new recipe_1.CookingStep({
                stepNum: index + 1,
                stepDesc: i,
                imgSrc: files.cookingStep[index].filename,
            })),
            completedImgs: files.completedImgs.map((i) => i.filename),
            viewCount: 0,
        };
        const saveRecipe = yield recipeService_1.default.create(recipeData);
        res.status(200).json(saveRecipe);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "server error" });
    }
});
exports.createRecipes = createRecipes;
const readRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipeList = yield recipeService_1.default.read();
    res.send(recipeList);
});
exports.readRecipes = readRecipes;
const readRecipeDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const detail = yield recipeService_1.default.readDetail(req.query.id);
    res.send(detail);
});
exports.readRecipeDetail = readRecipeDetail;
const readViewCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipe = yield recipe_1.ViewCount.findById(req.params._id);
        console.log("1111", req.params);
        if (!recipe) {
            res.status(404).send("Recipe not found");
        }
        else {
            recipe.viewCount += 1;
            yield recipe.save();
            res.send(recipe);
        }
    }
    catch (err) {
        res.status(500).send(err);
    }
});
exports.readViewCount = readViewCount;
const readSearchRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const search = yield recipeService_1.default.readSearch(req.query.keyword);
    res.send(search);
});
exports.readSearchRecipes = readSearchRecipes;
