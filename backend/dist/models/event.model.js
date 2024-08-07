"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const EventSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    location: {
        type: String,
    },
    startDateTime: {
        type: Date,
        default: Date.now,
    },
    endDateTime: {
        type: Date,
        default: Date.now,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    price: {
        type: String,
    },
    isFree: {
        type: Boolean,
        default: false,
    },
    url: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category',
    },
    organizer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});
const Event = mongoose_1.models.Event || (0, mongoose_1.model)('Event', EventSchema);
exports.default = Event;
