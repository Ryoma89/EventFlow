"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = (0, express_1.Router)();
router.get('/user', userController_1.getUser);
router.put('/users/:userId', authMiddleware_1.default, userController_1.editUser);
router.delete('/users/:userId', authMiddleware_1.default, userController_1.deleteUser);
exports.default = router;
