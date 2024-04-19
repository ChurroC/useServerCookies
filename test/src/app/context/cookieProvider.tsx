import { CookieProvider as CookieProviderWithoutCookie } from "./cookie.context";
import { cookies } from "next/headers";

export async function ServerStateProvider({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        // To have cookie we need this to be a server component
        <CookieProviderWithoutCookie cookies={cookies().getAll()}>
            {children}
        </CookieProviderWithoutCookie>
    );
}
