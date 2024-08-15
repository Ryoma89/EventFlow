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
exports.stripeWebhook = exports.createCheckoutSession = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const stripe_1 = __importDefault(require("stripe"));
const database_1 = require("../database");
const booking_model_1 = __importDefault(require("../models/booking.model"));
const mongoose_1 = require("mongoose");
dotenv_1.default.config();
const createCheckoutSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const stripe = new stripe_1.default(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
    const { order } = req.body;
    const price = order.isFree ? 0 : Number(order.price) * 100;
    try {
        const session = yield stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: "cad",
                        unit_amount: price,
                        product_data: {
                            name: order.eventTitle,
                        },
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                eventId: order.eventId,
                buyerId: order.buyerId,
            },
            mode: "payment",
            success_url: `${process.env.FRONTEND_URL}/events/${order.eventId}`,
            cancel_url: `${process.env.FRONTEND_URL}/events/${order.eventId}`,
        });
        return res.status(200).json({ url: session.url });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.createCheckoutSession = createCheckoutSession;
const stripeWebhook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
    const sig = req.headers["stripe-signature"];
    const stripeWebhookSecret = process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET;
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body.toString(), sig, stripeWebhookSecret);
    }
    catch (error) {
        return res.status(400).json(error);
    }
    const eventType = event.type;
    try {
        if (eventType !== "checkout.session.completed")
            return res.status(400).json({ message: "Webhook error" });
        const { id, amount_total, metadata } = event.data.object;
        const eventId = (metadata === null || metadata === void 0 ? void 0 : metadata.eventId)
            ? new mongoose_1.Types.ObjectId(metadata.eventId)
            : null;
        const buyerId = (metadata === null || metadata === void 0 ? void 0 : metadata.buyerId)
            ? new mongoose_1.Types.ObjectId(metadata.buyerId)
            : null;
        if (!eventId || !buyerId) {
            return res.status(400).json({ message: "Invalid eventId or buyerId" });
        }
        yield (0, database_1.connectDB)();
        const newOrder = yield booking_model_1.default.create({
            stripeId: id,
            totalAmount: amount_total ? (amount_total / 100).toString() : "0",
            event: eventId,
            buyer: buyerId,
            createdAt: new Date(),
        });
        return res.status(200).json({ message: "OK", order: newOrder });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.stripeWebhook = stripeWebhook;
