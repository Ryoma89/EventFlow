"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BookingSchema = new mongoose_1.Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    stripeId: {
        type: String,
        required: true,
        unique: true,
    },
    totalAmount: {
        type: String,
    },
    event: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Event',
    },
    buyer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
});
const Booking = mongoose_1.models.Booking || (0, mongoose_1.model)('Booking', BookingSchema);
exports.default = Booking;
