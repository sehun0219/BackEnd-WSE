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
Object.defineProperty(exports, "__esModule", { value: true });
const recipe_1 = require("../models/recipe");
const create = (recipeData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("레시피데이터 컨트롤러스에서 오는데이터", recipeData);
        const recipe = new recipe_1.Recipe(recipeData);
        console.log("데이터베이스에 저장되는 데이터:", recipe);
        yield recipe.save();
        return recipe;
    }
    catch (error) {
        console.error("recipeCreate", error);
        throw new Error("Recipe creation failed");
    }
});
const read = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipes = yield recipe_1.Recipe.find({});
        return recipes;
    }
    catch (error) {
        console.error("read", error);
        throw new Error("Recipe read failed");
    }
});
const readDetail = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const detail = yield recipe_1.Recipe.find({ _id: id });
        return detail;
    }
    catch (error) {
        console.error("read", error);
        throw new Error("Detail read failed");
    }
});
const readSearch = (keyword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const search = yield recipe_1.Recipe.find({ title: { $regex: `.*${keyword}.*` } });
        return search;
    }
    catch (error) {
        console.error("read", error);
        throw new Error("search read failed");
    }
});
exports.default = {
    create,
    read,
    readDetail,
    readSearch,
};
