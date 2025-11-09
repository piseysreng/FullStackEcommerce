'use client';

import { FormControl } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { HStack } from "@/components/ui/hstack";
import { Button, ButtonText } from "@/components/ui/button";
import { useState } from "react";
import { login, signup } from "@/api/auth";
import { handleLogin, handleSignup } from "./actions";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
                    <Heading className="text-typography-900">Login</Heading>
                    <VStack space="xs">
                        <Text className="text-typography-500">Email</Text>
                        <Input>
                            <InputField type="text" value={email} onChangeText={setEmail} />
                        </Input>
                    </VStack>
                    <VStack space="xs">
                        <Text className="text-typography-500">Password</Text>
                        <Input>
                            <InputField value={password} onChangeText={setPassword} type='password' />
                        </Input>
                    </VStack>
                    {errorMessage && <Text className="text-red-500">{errorMessage}</Text>}
                    <HStack space='sm'>
                        <Button className="flex-1" variant='outline' onPress={()=> handleSignup(email,password)}>
                            <ButtonText >Sign Up</ButtonText>
                        </Button>
                        <Button className="flex-1" onPress={()=> handleLogin(email,password)}>
                            <ButtonText >Sign In</ButtonText>
                        </Button>
                    </HStack>

                </VStack>
            </FormControl>
        </div>

    );
}