"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewCount = exports.CookingInfo = exports.CookingStep = exports.Ingredient = exports.Recipe = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const cookingStepSchema = new mongoose_1.default.Schema({
    imgSrc: String,
    stepDesc: String,
    stepNum: Number,
});
const cookingInfoSchema = new mongoose_1.default.Schema({
    servingSize: String,
    time: String,
    difficulty: String,
});
const ingredientSchema = new mongoose_1.default.Schema({
    ingredient: String,
    quantity: String,
});
const recipeSchema = new mongoose_1.default.Schema({
    userInfo: String,
    title: String,
    desc: String,
    category: String,
    cookingInfo: cookingInfoSchema,
    mainImg: String,
    ingredient: [ingredientSchema],
    cookingStep: [cookingStepSchema],
    completedImgs: [String],
});
const recipeCountSchema = new mongoose_1.Schema({
    title: String,
    viewCount: { type: Number, default: 0 },
});
exports.Recipe = mongoose_1.default.model("Recipe", recipeSchema);
exports.Ingredient = mongoose_1.default.model("Ingredient", ingredientSchema);
exports.CookingStep = mongoose_1.default.model("cookingStep", cookingStepSchema);
exports.CookingInfo = mongoose_1.default.model("cookingInfo", cookingInfoSchema);
exports.ViewCount = mongoose_1.default.model("viewCount", recipeCountSchema);
