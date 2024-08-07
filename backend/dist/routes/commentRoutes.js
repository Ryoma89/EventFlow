"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const commentController_1 = require("../controllers/commentController");
const router = (0, express_1.Router)();
router.post('/comments', authMiddleware_1.default, commentController_1.createComment);
router.delete('/comments/:commentId', authMiddleware_1.default, commentController_1.deleteComment);
exports.default = router;
