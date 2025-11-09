import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type LoginPageLayoutProps = {
    children : React.ReactNode;
}

export default async function LoginPageLayout ({children,}: LoginPageLayoutProps){
    const token = (await cookies()).get('token')?.value;
    if (!!token) {
        return redirect('/dashboard');
    }
    return (
        <div>{children}</div>
    );
}