import { View, FlatList } from 'react-native'
import React from 'react'
import { useCart } from '@/store/cartStore'
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Redirect } from 'expo-router';

export default function CartScreen() {
    const items = useCart((state) => state.items);
    const resetCart = useCart(state => state.resetCart);
    // console.log(items);
    const onCheckOut = async () => {
        // Sent Order to Server
        // Reset the Cart Items
        resetCart();
    }

    if (items.length === 0) {
        return <Redirect href={'/'}/>
    }
    return (
        <FlatList
            data={items}
            contentContainerClassName='gap-2 max-w-[960px] w-full mx-auto'
            renderItem={({ item }) => (
                <HStack className='bg-white p-3'>
                    <VStack space='sm'>
                        <Text bold>{item.product.name}</Text>
                        <Text>$ {item.product.price}</Text>
                    </VStack>
                    <Text className='ml-auto'>{item.quantity}</Text>
                </HStack>
            )}
            ListFooterComponent={()=> (
                <Button onPress={onCheckOut}>
                    <ButtonText>Checkout</ButtonText>
                </Button>
            )}
        />
    )
}