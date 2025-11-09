import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Image } from '@/components/ui/image';
import Link from 'next/link';

export default function ProductListItem({ product }) {
    return (
        <div>
            <Image
                source={{
                    uri: 'https://gluestack.github.io/public-blog-video-assets/mountains.png',
                }}
                alt="Logo"
                size="none"
                className="aspect-[320/208] w-full max-w-[320px]"
            />
        </div>



    );
}