import { View, FlatList, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { useCart } from '@/store/cartStore'
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Redirect, router, useRouter } from 'expo-router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createOrder } from '@/api/orders';
import { createPaymentIntent } from '@/api/stripe';
import { useStripe } from '@stripe/stripe-react-native';

export default function CartScreen() {
    const items = useCart((state) => state.items);
    const resetCart = useCart(state => state.resetCart);
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const router = useRouter();

    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet();

        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message);
            // ToDo: handle Error. The order is submitted, but payment failed.
        } else {
            Alert.alert('Success', 'Your order is confirmed!');
            resetCart();
            router.replace('/');
        }
    };

    const paymentIntentMutation = useMutation({
        mutationFn: createPaymentIntent,
        onSuccess: async (data) => {
            console.log(data);
            const { error } = await initPaymentSheet({
                merchantDisplayName: "Example, Inc.",
                customerId: data.customer,
                customerEphemeralKeySecret: data.ephemeralKey,
                paymentIntentClientSecret: data.paymentIntent,
                // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
                //methods that complete payment after a delay, like SEPA Debit and Sofort.
                allowsDelayedPaymentMethods: true,
                defaultBillingDetails: {
                    name: 'Jane Doe',
                },
                returnURL: 'your-app-scheme://'
            });
            if (error) {
                Alert.alert('Error', error.message);
                console.log(error);
            };
            openPaymentSheet();
        },
        onError: (error) => { console.log(error) },
    });
    // console.log(paymentIntent);
    // useEffect(() => {
    //     paymentIntentMutation.mutate();
    // }, []);

    

    const createOrderMutation = useMutation({
        mutationFn: () => createOrder(
            items.map((item) => ({
                productId: item.product.id,
                quantity: item.quantity,
                price: item.product.price
            }))
        ),
        onSuccess: (data) => {
            paymentIntentMutation.mutate({orderId : data.id});
            // resetCart();
            // router.push(`/orders/${data.id}`);
        },
        onError: (error) => { console.log(error) },
    });


    

    // console.log(items);
    const onCheckOut = async () => {
        // Create Order to get the ID first
        createOrderMutation.mutateAsync();
        

        // openPaymentSheet();
        // Sent Order to Server
        // createOrderMutation.mutate();

        // Reset the Cart Items

    }

    if (items.length === 0) {
        return <Redirect href={'/'} />
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
            ListFooterComponent={() => (
                <Button onPress={onCheckOut}>
                    <ButtonText>Checkout</ButtonText>
                </Button>
            )}
        />
    )
}