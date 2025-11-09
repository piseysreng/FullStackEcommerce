import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

type DashboardLayoutProps = {
    children : React.ReactNode;
}

export default async function DashboardLayout ({children,}: DashboardLayoutProps){
    const token = (await cookies()).get('token')?.value;
    if (!token) {
        return redirect('/login');
    }
    return (
        
        <div className="h-screen overflow-hidden">
            <Header />
            <HStack className="h-full">
                <Sidebar />
                <Box className="flex-1 overflow-y-auto p-3">
                    {children}
                </Box>
            </HStack>
            <MobileNavBar/>
        </div>
    );
}

function Header(){
    return (
        <HStack className="p-5 border-b justify-between flex flex-1 items-center">
            <Heading>Dashboard</Heading>
            <Avatar>
                <AvatarFallbackText>VS</AvatarFallbackText>
            </Avatar>
        </HStack>
    );
}

function Sidebar(){
    return (
        <VStack className="p-3 border-r gap-3">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/dashboard/products">Products</Link>
            <Link href="/dashboard/orders">Orders</Link>
        </VStack>
    );
}

function MobileNavBar(){
    return (
        <HStack className="p-3 border-r gap-3 absolute bottom-0 left-0 right-0">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/dashboard/products">Products</Link>
            <Link href="/dashboard/orders">Orders</Link>
        </HStack>
    );
}