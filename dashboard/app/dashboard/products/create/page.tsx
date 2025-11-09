'use client';

import { FormControl } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Input, InputField } from "@/components/ui/input";
import { HStack } from "@/components/ui/hstack";
import { Button, ButtonText } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { createProduct } from "./action";

export default function CreateProductPage() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const searchParams = useSearchParams();
    const errorMessage = searchParams.get('errorMessage');
    return (
        <div className="flex-1 flex min-h-screen justify-center items-center">
            <FormControl
                // isInvalid={loginMutation.error || signUpMutation.error ? true : false} 
                isInvalid={!!errorMessage}
                className=" flex-1 p-4 border border-outline-200 max-w-[500px] rounded-lg m-2 mx-auto"
            >
                <VStack className="gap-4">
                    <Heading className="text-typography-900">Create Product</Heading>
                    <VStack space="xs">
                        <Text className="text-typography-500">Name</Text>
                        <Input>
                            <InputField type="text" value={name} onChangeText={setName} />
                        </Input>
                    </VStack>
                    <VStack space="xs">
                        <Text className="text-typography-500">Description</Text>
                        <Input>
                            <InputField type="text" value={description} onChangeText={setDescription} />
                        </Input>
                    </VStack>
                    <VStack space="xs">
                        <Text className="text-typography-500">Price</Text>
                        <Input>
                            <InputField type="text" value={price} onChangeText={setPrice} />
                        </Input>
                    </VStack>
                    {errorMessage && <Text className="text-red-500">{errorMessage}</Text>}

                    <Button className="flex-1" variant='outline' onPress={() => createProduct(name,description,Number(price))}>
                        <ButtonText >Create Product</ButtonText>
                    </Button>



                </VStack>
            </FormControl>
        </div>
    )
}
