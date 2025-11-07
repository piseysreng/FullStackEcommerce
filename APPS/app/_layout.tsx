import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import { Link, Stack } from 'expo-router'
import '@/global.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Icon } from '@/components/ui/icon';
import {ShoppingCart} from 'lucide-react-native';
import { Pressable, Text } from 'react-native';
import { useCart } from '@/store/cartStore';

const queryClient = new QueryClient();

export default function _layout() {
  const cartItemsNum = useCart(state => state.items.length);

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode='dark'>
        <Stack screenOptions={{
          headerRight: () => 
            <Link href={"/cart"} asChild>
              <Pressable className='flex-row gap-2'>
                <Icon as={ShoppingCart}/>
                <Text>{cartItemsNum}</Text>
              </Pressable>
            </Link>
        }}>
          <Stack.Screen name='index' options={{
            title: "Shop"
          }} />
          <Stack.Screen name='product/[id]' options={{
            title: "Product"
          }} />
        </Stack>
      </GluestackUIProvider>
    </QueryClientProvider>

  )
}