import { Request, Response } from "express";
import { db } from '../../db/index.js';
import Stripe from 'stripe';
import { orderItemsTable, ordersTable } from "../../db/ordersSchema.js";
import { eq } from "drizzle-orm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function getKeys(req: Request, res: Response) {
    res.json({ publishableKey: process.env.STRIPE_PUBLISABLE_KEY });
}

export async function createPaymentIntent(req: Request, res: Response) {
    const { orderId } = req.body;
    const order = await db.select().from(ordersTable).where(eq(ordersTable.id, orderId));
    const orderItems = await db.select().from(orderItemsTable).where(eq(orderItemsTable.orderId, orderId));
    // Calculate Total Sum of Order
    const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const amount = Math.floor(total * 100);

    if (amount === 0) {
        res.status(400).json({ message: 'Order total is 0 Can not complete' });
        return;
    }
    // TODO: Add info about the Customer
    const customer = await stripe.customers.create();
    const customerSession = await stripe.customerSessions.create({
        customer: customer.id,
        components: {
            mobile_payment_element: {
                enabled: true,
                features: {
                    payment_method_save: 'enabled',
                    payment_method_redisplay: 'enabled',
                    payment_method_remove: 'enabled'
                }
            },
        },
    });

    const ephemeralKey = await stripe.ephemeralKeys.create(
        { customer: customer.id },
        { apiVersion: '2025-10-29.clover' }
    );

    //  TODO Calculate the amount dynamically

    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        customer: customer.id,
        automatic_payment_methods: {
            enabled: true,
        },
    });

    res.json({
        paymentIntent: paymentIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        customerSessionClientSecret: customerSession.client_secret,
        customer: customer.id,
        publishableKey: process.env.STRIPE_PUBLISABLE_KEY,
    });
}

export async function webhook(req: Request, res: Response) {
    console.log(req.body);
    const event = req.body;



    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            // Then define and call a method to handle the successful payment intent.
            // handlePaymentIntentSucceeded(paymentIntent);
            break;
        case 'payment_method.attached':
            const paymentMethod = event.data.object;
            // Then define and call a method to handle the successful attachment of a PaymentMethod.
            // handlePaymentMethodAttached(paymentMethod);
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event


    res.json({ recieved: true });
}