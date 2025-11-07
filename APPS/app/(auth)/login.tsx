import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { FormControl } from '@/components/ui/form-control';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { EyeIcon, EyeOffIcon } from '@/components/ui/icon';
// import { useState } from 'react';
import React, { useState } from 'react'
import { HStack } from '@/components/ui/hstack';
import { useMutation } from '@tanstack/react-query';
import { login, signup } from '@/api/auth';
import { useAuth } from '@/store/authStore';
import { Redirect } from 'expo-router';



export default function LoginScreen() {
    const [showPassword, setShowPassword] = React.useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const setUser = useAuth(s => s.setUser);
    const setToken = useAuth(s => s.setToken);
    const isLogginIn = useAuth(s => s.token);
    
    const loginMutation = useMutation({
        mutationFn: () => login(email, password),
        onSuccess: (data) => {
            console.log('Success', data);
            if (data.user && data.token) {
               setUser(data.user) ;
               setToken(data.token) ;
            }
        },
        onError: () => {console.log('Error')},
    });

    const signUpMutation = useMutation({
        mutationFn: () => signup(email, password),
        onSuccess: (data) => {
            console.log('Success signup');
            if (data.user && data.token) {
               setUser(data.user) ;
               setToken(data.token) ;
            }
        },
        onError: () => {console.log('Error signup')},
    });

    const handleState = () => {
        setShowPassword((showState) => {
            return !showState;
        });
    };

    if (isLogginIn) {
        return <Redirect href={'/'}/>;
    }
    return (
        <FormControl isInvalid={loginMutation.error || signUpMutation.error ? true : false} className="p-4 border border-outline-200 rounded-lg w-full bg-white m-2">
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
                        <InputField value={password} onChangeText={setPassword} type={showPassword ? 'text' : 'password'} />
                        <InputSlot className="pr-3" onPress={handleState}>
                            <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                        </InputSlot>
                    </Input>
                </VStack>
                <HStack space='sm'>
                    <Button className="flex-1" variant='outline' onPress={()=> {signUpMutation.mutate()}}>
                        <ButtonText >Sign Up</ButtonText>
                    </Button>
                    <Button className="flex-1" onPress={()=> loginMutation.mutate()}>
                        <ButtonText >Sign In</ButtonText>
                    </Button>
                </HStack>

            </VStack>
        </FormControl>
    );
}
// import { View, Text } from 'react-native'
// import React from 'react'

// export default function LoginScreen() {
//   return (
//     <View>
//       <Text>LoginScreen</Text>
//     </View>
//   )
// }