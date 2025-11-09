import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import { Link, Stack } from 'expo-router'
import '@/global.css';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { Icon } from '@/components/ui/icon';
import { ShoppingCart, User } from 'lucide-react-native';
import { Pressable, Text } from 'react-native';
import { useCart } from '@/store/cartStore';
import React from 'react';
import { useAuth } from '@/store/authStore';
import CustomStripeProvider from '@/components/CustomStripeProvider';

const queryClient = new QueryClient();

export default function _layout() {
  const cartItemsNum = useCart(state => state.items.length);
  const isLoggedIn = useAuth(s => s.token);


  return (
    <QueryClientProvider client={queryClient}>
      <CustomStripeProvider>
        <GluestackUIProvider mode='dark'>
          <Stack screenOptions={{
            headerRight: () =>
            (<Link href={"/cart"} asChild>
              <Pressable className='flex-row gap-2'>
                <Icon as={ShoppingCart} />
                <Text>{cartItemsNum}</Text>
              </Pressable>
            </Link>),
            headerLeft: () => (
              <Link href={"/login"} asChild>
                <Pressable className='flex-row gap-2'>
                  <Icon as={User} />
                </Pressable>
              </Link>
            ),
          }}>
            <Stack.Screen name='index' options={{
              title: "Shop",
              headerLeft: () => !isLoggedIn && (
                <Link href={"/login"} asChild>
                  <Pressable className='flex-row gap-2'>
                    <Icon as={User} />
                  </Pressable>
                </Link>
              ),
            }} />
            <Stack.Screen name='product/[id]' options={{
              title: "Product"
            }} />
          </Stack>
        </GluestackUIProvider>
      </CustomStripeProvider>
    </QueryClientProvider>

  )
}