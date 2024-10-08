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
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGODB_URI = process.env.MONGODB_URI;
let cached = global.mongoose || { conn: null, promise: null };
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    if (cached.conn)
        return cached.conn;
    if (!MONGODB_URI)
        return new Error('MONGODB_URI is missing');
    cached.promise =
        cached.promise ||
            mongoose_1.default
                .connect(MONGODB_URI, {
                dbName: 'eventflow',
                bufferCommands: false,
            })
                .catch((error) => {
                console.error('MongoDB connection error:', error);
                throw error;
            });
    cached.conn = yield cached.promise;
    return cached.conn;
});
exports.connectDB = connectDB;
