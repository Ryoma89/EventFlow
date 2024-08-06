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
exports.deleteComment = exports.createComment = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("../database");
const comment_model_1 = __importDefault(require("../models/comment.model"));
dotenv_1.default.config();
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_1.connectDB)();
        const { comment, eventId } = req.body;
        const { userId } = req.user;
        const newComment = yield comment_model_1.default.create({
            content: comment,
            user: userId,
            event: eventId,
        });
        return res.status(201).json(newComment);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.createComment = createComment;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_1.connectDB)();
        const { commentId } = req.params;
        const deleteComment = yield comment_model_1.default.findByIdAndDelete(commentId);
        return res.status(201).json(deleteComment);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.deleteComment = deleteComment;
