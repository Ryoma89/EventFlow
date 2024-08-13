import dotenv from "dotenv";
import { Request, Response } from "express";
import Stripe from "stripe";
import { connectDB } from "../database";
import Booking from "../models/booking.model";
import { Types } from "mongoose";

dotenv.config();

export const createCheckoutSession = async (req: Request, res: Response) => {
  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);
  const { order } = req.body;

  const price = order.isFree ? 0 : Number(order.price) * 100;

  try {
    const session = await stripe.checkout.sessions.create({
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
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const stripeWebhook = async (req: Request, res: Response) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const sig = req.headers["stripe-signature"];
  const stripeWebhookSecret = process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body.toString(),
      sig!,
      stripeWebhookSecret!
    );
  } catch (error) {
    return res.status(400).json(error);
  }

  const eventType = event.type;

  try {
    if (eventType !== "checkout.session.completed")
      return res.status(400).json({ message: "Webhook error" });
    const { id, amount_total, metadata } = event.data.object;

    const eventId = metadata?.eventId
      ? new Types.ObjectId(metadata.eventId)
      : null;
    const buyerId = metadata?.buyerId
      ? new Types.ObjectId(metadata.buyerId)
      : null;

    if (!eventId || !buyerId) {
      return res.status(400).json({ message: "Invalid eventId or buyerId" });
    }

    await connectDB();
    const newOrder = await Booking.create({
      stripeId: id,
      totalAmount: amount_total ? (amount_total / 100).toString() : "0",
      event: eventId,
      buyer: buyerId,
      createdAt: new Date(),
    });
    return res.status(200).json({ message: "OK", order: newOrder });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
