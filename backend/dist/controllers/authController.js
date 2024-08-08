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
exports.signOut = exports.signIn = exports.signUp = void 0;
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
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            domain: 'localhost',
            // secure: true,
            sameSite: 'strict',
            maxAge: 3600000,
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
        res.status(200).json({ message: 'Sign out successful' });
    }
    catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.signOut = signOut;
