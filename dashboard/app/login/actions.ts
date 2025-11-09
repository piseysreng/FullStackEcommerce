'use server';

import { login, signup } from "@/api/auth";
import {cookies} from 'next/headers';
import { redirect } from "next/navigation";

export async function handleLogin(email:string, password: string) {
    let redirectUrl = `/login?errorMessage=${encodeURIComponent('Fail to Login')}`;
    try {
        const res = await login(email,password);  
        
        // ToDo: Save token to cookies
        if (res.token) {
            (await cookies()).set('token', res.token);    
            redirectUrl = '/dashboard';
        }

        console.log(res);
    } catch (error) {
        console.log(error);
    } finally{
        redirect(redirectUrl);
    }
}

export async function handleSignup(email:string, password: string) {
    let redirectUrl = `/login?errorMessage=${encodeURIComponent('Fail to Sign Up')}`;
    try {
        const res = await signup(email,password);  
        
        // ToDo: Save token to cookies
        if (res.token) {
            (await cookies()).set('token', res.token);    
            redirectUrl = '/dashboard';
        }

        console.log(res);
    } catch (error) {
        console.log(error);
    } finally{
        redirect(redirectUrl);
    }
}