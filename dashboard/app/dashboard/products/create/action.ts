'use server';

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function createProduct(
    name: string,
    description: string,
    price: number
) {
    let redirectUrl = '/dashboard/products';
    try {
        const token = (await cookies()).get('token')?.value;
        const res = await fetch(`${API_URL}/products/`, {
            method: 'POST',
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                description,
                price
            }),
        });

        console.log(res);
        if (!res.ok) {
            throw new Error('Failed to create product');
        }
        

    } catch (error) {
        redirectUrl = `/dashboard/products/create?errorMessage=${encodeURIComponent('Failed to create product')}`;
    }
    finally{
        redirect(redirectUrl);
    }

}