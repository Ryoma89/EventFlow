import dotenv from 'dotenv';
import { Request, Response } from 'express';
import Stripe from 'stripe';
import { connectDB } from '../database';
import Booking from '../models/booking.model';

dotenv.config();


export const createCheckoutSession = async (req: Request, res: Response) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const { order } = req.body;
  console.log({order})
  
  const price = order.isFree ? 0 : Number(order.price) * 100;

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'cad',
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
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/profile`,
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
  const sig = req.headers['stripe-signature'];
  const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig!,
      stripeWebhookSecret!
    );
  } catch (error) {
    return res.status(400).json(error);
  }

  const eventType = event.type;

  if (eventType === 'checkout.session.completed') {
    const { id, amount_total, metadata } = event.data.object;
    const order = {
      stripeId: id,
      eventId: metadata?.eventId || '',
      buyerId: metadata?.buyerId || '',
      totalAmount: amount_total ? (amount_total / 100).toString() : '0',
      createdAt: new Date(),
    };

    try {
      await connectDB();
      const newOrder = await Booking.create(order);
      return res.status(200).json({ message: 'OK', order: newOrder });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
};
