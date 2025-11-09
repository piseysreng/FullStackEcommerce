import { fetchOrdersById } from "@/api/orders";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import StatusSelector from "./StatusSelector";

export default async function OrderPageById({ params }: { params: { id: string } }) {
    const { id } = await params;
    const order = await fetchOrdersById(Number(id));
    console.log(order);
    return (
        <div>
            <Card>
                <HStack className="gap-5">
                    <Text># : {order?.id}</Text>
                    <Text>Created at : {order?.createdAt}</Text>
                    <div>
                        <StatusSelector status={order?.status} id={order?.id}/>
                    </div>
                </HStack>
                <Heading>Items</Heading>
                {order.items.map(orderItem => (
                    <HStack key={orderItem?.id} className="gap-5">
                        <Text>{orderItem?.productId}</Text>
                        <Text>{orderItem?.quantity}</Text>
                        <Text>{orderItem?.price}</Text>
                    </HStack>
                ))}
            </Card>
        </div>
    )
}
