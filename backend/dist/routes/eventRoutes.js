"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eventController_1 = require("../controllers/eventController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = (0, express_1.Router)();
router.get('/events', eventController_1.getAllEvents);
router.get('/my-events', authMiddleware_1.default, eventController_1.getMyEvents);
router.get('/my-attending-events', authMiddleware_1.default, eventController_1.getMyAttendingEvents);
router.get('/trending-events', eventController_1.getTrendingEvents);
router.get('/events/:eventId', eventController_1.getEventById);
router.post('/events', authMiddleware_1.default, eventController_1.createEvent);
router.put('/events', authMiddleware_1.default, eventController_1.editEvent);
router.delete('/events', authMiddleware_1.default, eventController_1.deleteEvent);
exports.default = router;
