import { Request, Response } from "express";
import { db } from '../../db/index.js';
import Stripe from 'stripe';
import { ordersTable } from "../../db/ordersSchema.js";
import { eq } from "drizzle-orm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function getKeys(req: Request, res: Response) {
    res.json({ publishableKey: process.env.STRIPE_PUBLISABLE_KEY });
}

export async function createPaymentIntent(req: Request, res: Response) {
    const {orderId} = req.body;
    const order = await db.select().from(ordersTable).where(eq(ordersTable.id , orderId));

    console.log(order);
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
        {apiVersion: '2025-10-29.clover'}
    );

    //  TODO Calculate the amount dynamically

    const paymentIntent = await stripe.paymentIntents.create({
        amount: 1099,
        currency: 'eur',
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