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
exports.deleteEvent = exports.editEvent = exports.createEvent = exports.getEventById = exports.getMyAttendingEvents = exports.getMyEvents = exports.getTrendingEvents = exports.getAllEvents = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("../database");
const event_model_1 = __importDefault(require("../models/event.model"));
const category_model_1 = __importDefault(require("../models/category.model"));
const booking_model_1 = __importDefault(require("../models/booking.model"));
const comment_model_1 = __importDefault(require("../models/comment.model"));
dotenv_1.default.config();
const getAllEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_1.connectDB)();
        const events = yield event_model_1.default.find({})
            .populate('category')
            .populate('organizer');
        return res.status(200).json(events);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.getAllEvents = getAllEvents;
const getTrendingEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_1.connectDB)();
        const trendingEvents = yield booking_model_1.default.aggregate([
            {
                $group: {
                    _id: '$event',
                    count: { $sum: 1 },
                },
            },
            {
                $sort: { count: -1 },
            },
            {
                $lookup: {
                    from: 'events',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'eventDetails',
                },
            },
            {
                $unwind: '$eventDetails',
            },
            {
                $project: {
                    _id: 0,
                    eventId: '$_id',
                    count: 1,
                    event: '$eventDetails',
                },
            },
        ]);
        return res.status(200).json(trendingEvents);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Failed to get events' });
    }
});
exports.getTrendingEvents = getTrendingEvents;
const getMyEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_1.connectDB)();
        const user = req.user;
        const myEvents = yield event_model_1.default.find({ organizer: user.userId });
        return res.status(200).json(myEvents);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Failed to get events' });
    }
});
exports.getMyEvents = getMyEvents;
const getMyAttendingEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_1.connectDB)();
        const user = req.user;
        const myEvents = yield booking_model_1.default.find({ buyer: user.userId }).populate('event');
        return res.status(200).json(myEvents);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Failed to get events' });
    }
});
exports.getMyAttendingEvents = getMyAttendingEvents;
const getEventById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_1.connectDB)();
        const { eventId } = req.params;
        if (!eventId)
            return res.status(400).json({ message: 'Event ID is required' });
        const event = yield event_model_1.default.findById(eventId)
            .populate('category')
            .populate('organizer');
        if (!event)
            return res.status(404).json({ message: 'Event is not found' });
        const buyer = yield booking_model_1.default.find({ event: eventId }).populate('buyer');
        const attendees = buyer.map((b) => b.buyer);
        const comments = yield comment_model_1.default.find({ event: eventId }).populate('user');
        return res.status(200).json({ event, attendees, comments });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Failed to get event' });
    }
});
exports.getEventById = getEventById;
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('create event');
        yield (0, database_1.connectDB)();
        const { event } = req.body;
        console.log(event);
        const category = yield category_model_1.default.findOne({ name: event.category });
        const categoryId = category._id;
        const newEvent = yield event_model_1.default.create(Object.assign(Object.assign({}, event), { category: categoryId }));
        return res.status(201).json(newEvent);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.createEvent = createEvent;
const editEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_1.connectDB)();
        const { event, eventId } = req.body;
        const category = yield category_model_1.default.findOne({ name: event.category });
        const categoryId = category._id;
        const UpdateEvent = yield event_model_1.default.findByIdAndUpdate(eventId, Object.assign(Object.assign({}, event), { category: categoryId }));
        return res.status(201).json(UpdateEvent);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.editEvent = editEvent;
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_1.connectDB)();
        const { eventId } = req.body;
        const deleteEvent = yield event_model_1.default.findByIdAndDelete(eventId);
        return res.status(201).json(deleteEvent);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.deleteEvent = deleteEvent;
