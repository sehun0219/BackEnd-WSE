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
exports.logout = exports.removeUser = exports.userEdit = exports.user = exports.profile = exports.liked = exports.login = exports.signUp = void 0;
const util_1 = require("../util");
const userService_1 = __importDefault(require("../services/userService"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
// 회원 가입 (signup)
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, password, email } = req.body;
        if (!name) {
            console.log(name);
            return res.status(400).send("Name is required");
        }
        if (!password) {
            console.log(password);
            return res.status(400).send("Password is required");
        }
        if (!(0, util_1.isValidPassword)(req.body.password)) {
            return res.status(400).send("Password is not valid");
        }
        // Check if the image was uploaded
        const avatarImg = req.file ? `/AvatarImg/${req.file.filename}` : "";
        // Password hashing
        const saltRounds = 10;
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        const saveUser = yield userService_1.default.create({
            name,
            password: hashedPassword,
            avatarImg,
            email,
        });
        const token = jsonwebtoken_1.default.sign({ userId: saveUser._id }, "userSecretKey", {
            expiresIn: "1h",
        });
        return res.status(200).json({ token, user: saveUser });
    }
    catch (error) {
        console.log(error);
        return res.status(400).send(error.message);
    }
});
exports.signUp = signUp;
// 로그 인
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // 1. find user by email
        const user = yield user_1.default.findOne({ email });
        // 2. if user is not found, return error
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        // 3. if user exists, check if the password matches
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }
        // 4. if all checks pass, create jwt token
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, "userSecretKey", {
            expiresIn: "1h",
        });
        // 5. send token to the client
        return res.status(200).json({ token, user });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
});
exports.login = login;
//좋아요 모음 보여주는 페이지
const liked = (req, res) => {
    return res.send("나중에 보여줄 페이지 liked");
};
exports.liked = liked;
// 회원정보보기 (user information)
const profile = (req, res) => {
    res.send("회원정보페이지");
};
exports.profile = profile;
const user = (req, res) => { };
exports.user = user;
// 회원정보수정 (user edit)
const userEdit = (req, res) => { };
exports.userEdit = userEdit;
// 회원삭제 (Remove user)
const removeUser = (req, res) => { };
exports.removeUser = removeUser;
// 로그 아웃
const logout = (req, res) => { };
exports.logout = logout;
