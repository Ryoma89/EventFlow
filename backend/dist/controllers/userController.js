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
exports.deleteUser = exports.editUser = exports.getUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("../database");
dotenv_1.default.config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    yield (0, database_1.connectDB)();
    const tokenFromCookie = req.cookies.token;
    const refreshTokenFromCookie = req.cookies.refreshToken;
    const tokenFromHeader = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    const token = tokenFromCookie || tokenFromHeader;
    if (!refreshTokenFromCookie) {
        return res.json(null);
    }
    else if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json(null);
    }
});
exports.getUser = getUser;
const editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_1.connectDB)();
        const { user } = req.body;
        const updateUser = yield user_model_1.default.findByIdAndUpdate(user.userId, {
            username: user.username,
            photo: user.photo,
        }, { new: true });
        return res.status(200).json(updateUser);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.editUser = editUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_1.connectDB)();
        const { userId } = req.body;
        const deleteUser = yield user_model_1.default.findByIdAndDelete(userId);
        return res.status(201).json(deleteUser);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.deleteUser = deleteUser;
