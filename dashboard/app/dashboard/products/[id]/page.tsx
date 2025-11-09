import { fetchProductById } from "@/api/products";
import ProductListItem from "../ProductListItem";

export default async function ProductPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const product = await fetchProductById(Number(id));
    return (
        <div className="max-w-lg mx-auto w-full">
            <ProductListItem product={product}/>
            <div>
                        
            </div>
            
        </div>
    );
}