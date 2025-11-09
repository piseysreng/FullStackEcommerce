import { fetchOrders } from "@/api/orders"
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import Link from "next/link";
// import { Table, TableBody, TableData, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default async function OrderPage() {
    const orders = await fetchOrders();
    return (
        <Card className="">
            <HStack className="p-4 border-b border-gray-200 gap-4">
                <Text>ID</Text>
                <Text>Date</Text>
                <Text>Status</Text>
            </HStack>
            {orders.map(order => (
                <Link key={order.id} href={`/dashboard/orders/${order.id}`}>
                    <HStack key={order.id} className="p-4 border-b border-gray-200 gap-4">
                        <Text>{order.id}</Text>
                        <Text>{order.createdAt}</Text>
                        <Text>{order.status}</Text>
                    </HStack>
                </Link>
            ))}
        </Card>
    )
}
