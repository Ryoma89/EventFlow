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
exports.refreshToken = exports.signOut = exports.signIn = exports.signUp = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../models/user.model"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("../database");
dotenv_1.default.config();
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_1.connectDB)();
        const { email, username, password } = req.body;
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const existingUser = yield user_model_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'The email is already in use' });
        }
        yield user_model_1.default.create({
            email,
            username,
            password: hashedPassword,
        });
        res.status(201).json({ message: 'User created successfully' });
    }
    catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_1.connectDB)();
        const { email, password } = req.body;
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'The email does not exist' });
        }
        if (!(yield bcrypt_1.default.compare(password, user.password))) {
            return res.status(401).json({ message: 'The password is incorrect' });
        }
        const accessToken = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1m',
        });
        const refreshToken = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, {
            expiresIn: '7d',
        });
        res.cookie('token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            // domain: 'localhost',
            // secure: true,
            sameSite: 'strict',
            maxAge: 1 * 60 * 1000, // 15 minutes
        });
        // res.cookie('token', token, {
        //   httpOnly: true,
        //   secure: true,
        //   sameSite: 'none',
        //   domain: 'eventflow-backend-stripe.onrender.com',
        //   maxAge: 3600000,
        // });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            // domain: 'localhost',
            // secure: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.signIn = signIn;
const signOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            domain: 'localhost',
            // secure: true,
            sameSite: 'strict',
        });
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            domain: 'localhost',
            // secure: true,
            sameSite: 'strict',
        });
        res.status(200).json({ message: 'Sign out successful' });
    }
    catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.signOut = signOut;
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let refreshToken;
    if (req.cookies.refreshToken) {
        refreshToken = req.cookies.refreshToken;
    }
    else {
        refreshToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    }
    if (!refreshToken)
        return res.status(401).json({ message: 'No refresh token provided' });
    try {
        const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const newAccessToken = jsonwebtoken_1.default.sign({
            userId: decoded.userId,
        }, process.env.JWT_SECRET, {
            expiresIn: '15m',
        });
        res.cookie('token', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            // domain: 'localhost',
            // secure: true,
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000, // 15 minutes
        });
        return res.status(200).json({ accessToken: newAccessToken });
    }
    catch (error) {
        return res.status(403).json({
            message: 'Invalid Refresh Token',
        });
    }
});
exports.refreshToken = refreshToken;
