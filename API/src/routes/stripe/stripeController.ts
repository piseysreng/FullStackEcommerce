import { Request, Response } from "express";

export async function getKeys(req: Request, res: Response) {    
    res.json({publishableKey: process.env.STRIPE_PUBLISABLE_KEY});
}