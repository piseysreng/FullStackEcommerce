import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchOrders (){
    const token = (await cookies()).get('token')?.value;
    try {
        const res = await fetch(`${API_URL}/orders`,{
            headers: {
                'Authorization': `${token}`,
                'Content-Type':'application/json',
            },
        });
        if (!res.ok) {
            console.log(res);
            throw new Error('Fetching Order Error');
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function fetchOrdersById (id: number){
    const token = (await cookies()).get('token')?.value;
    try {
        const res = await fetch(`${API_URL}/orders/${id}`,{
            headers: {
                'Authorization': `${token}`,
                'Content-Type':'application/json',
            },
        });
        if (!res.ok) {
            console.log(res);
            throw new Error('Fetching Order Error');
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

