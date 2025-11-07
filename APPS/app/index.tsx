import {ActivityIndicator, FlatList, useWindowDimensions } from 'react-native'
import ProductListItem from '@/components/ProductListItem'
import { listProducts } from '@/api/products';
import {useQuery} from '@tanstack/react-query';
import { Text } from '@/components/ui/text';

export default function HomeScreen() {
    const {data: products, isLoading, error} = useQuery({
        queryKey: ['products'],
        queryFn: listProducts
    });

    if (isLoading) {return <ActivityIndicator />};
    if (error) {return <Text>Error Fetching Products</Text>};

    // const {width} = useWindowDimensions();
    // const numColumn = width > 700 ? 3 : 2;
    const numColumn = 2;
    return (
        <FlatList
            key={numColumn}
            data={products}
            numColumns={numColumn}
            contentContainerClassName="gap-2 max-w-[960px] mx-auto w-full"
            columnWrapperClassName='gap-2'
            renderItem={({ item }) => <ProductListItem product={item}/>}
        />
    )
}