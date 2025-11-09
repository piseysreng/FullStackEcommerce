'use server';

import { cookies } from "next/headers";
import { redirect } from "next/navigation";


const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function updateOrderStatus(id: number, status: string) {
    let redirectUrl = `/dashboard/orders/${id}`;
    try {
        const token = (await cookies()).get('token')?.value;
        const res = await fetch(`${API_URL}/orders/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({status}),
        });

        if (!res.ok) {
            throw new Error('Failed to update the order status');
        }
        
    } catch (error) {
        console.log(error);
    }
    finally{
        redirect(redirectUrl);
    }


}