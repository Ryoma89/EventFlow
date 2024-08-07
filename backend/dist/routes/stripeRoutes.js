"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_2 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const stripeController_1 = require("../controllers/stripeController");
const router = (0, express_1.Router)();
router.post('/create-checkout-session', authMiddleware_1.default, stripeController_1.createCheckoutSession);
router.post('/webhook', express_2.default.raw({ type: 'application/json' }), stripeController_1.stripeWebhook);
exports.default = router;
