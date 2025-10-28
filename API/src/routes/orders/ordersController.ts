import { Request, Response } from "express";
import { db } from '../../db/index.js';
import { orderItemsTable, ordersTable } from "../../db/ordersSchema.js";

export async function createOrder (req: Request, res: Response){
    try {
        const userId = req.userId;
        const items = req.body.items;
        console.log(userId);
        if (!userId) {
            res.status(400).json({message: 'No User Id'});    
        }
        const [order] = await db.insert(ordersTable).values({userId: Number(userId)}).returning();

        const orderItems = items.map((item: any) => ({
            ...item,
            orderId: order.id,
        }));
        const newOrderItems = await db.insert(orderItemsTable).values(orderItems).returning();
        res.status(201).json({...order, items: newOrderItems})
    } catch (error) {
        res.status(400).json({message: 'Invalid Oder Data'});
    }
};