"use client";

import { createContext, useContext } from "react";
import type { RequestCookie } from "node_modules/next/dist/compiled/@edge-runtime/cookies/index.d.ts";

// Just going to have everything be strings here then cast it as the generic type in hook
// In the end it only matters if the generic they give is accurate
type CookieData = Record<string, string>;

const DropdownContext = createContext<CookieData>({});

export function CookieProvider({
    children,
    cookies
}: {
    children: React.ReactNode;
    cookies: RequestCookie[];
}) {
    // This is an array of name and value within like so [{name: 'theme', value: 'dark'}, {name: 'name', value: 'Churro'}]
    const cookieData: CookieData = cookies.reduce(
        (finalObject, currentCookie) => {
            return {
                ...finalObject,
                [currentCookie.name]: currentCookie.value
            };
        },
        {} as CookieData
    );
    // This is so I can directly map the value of the cookie instead of going through array like {theme: 'dark', name: 'Churro'} since O(1) vs O(n)
    return (
        <DropdownContext.Provider value={cookieData}>
            {children}
        </DropdownContext.Provider>
    );
}

// return in json
export function useCookie(cookieName: string) {
    return useContext(DropdownContext)[cookieName];
}