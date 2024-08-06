"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
router.post('/sign-up', authController_1.signUp);
router.post('/sign-in', authController_1.signIn);
router.post('/sign-out', authController_1.signOut);
exports.default = router;
