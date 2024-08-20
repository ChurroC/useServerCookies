"use client";

import { createContext, useContext, useState } from "react";
import type { RequestCookie } from "node_modules/next/dist/compiled/@edge-runtime/cookies/index.d.ts";

// Just going to have everything be strings here then cast it as the generic type in hook
// In the end it only matters if the generic they give is accurate
type CookieData = Record<string, string>;

const DropdownContext = createContext<[CookieData, React.Dispatch<React.SetStateAction<string>>]>({});

export function CookieProvider({
    children,
    cookies
}: {
    children: React.ReactNode;
    cookies: RequestCookie[];
}) {
    // This is an array of name and value within like so [{name: 'theme', value: 'dark'}, {name: 'bob', value: 'Churro'}]
    const [allCookies, setCookie] = useState<CookieData>(cookies.reduce(
        (finalObject, currentCookie) => {
            return {
                ...finalObject,
                [currentCookie.name]: currentCookie.value
            };
        },
        {} as CookieData
    ));

    // This is so I can directly map the value of the cookie instead of going through array like {theme: 'dark', bob: 'Churro'} since O(1) vs O(n)
    return (
        <DropdownContext.Provider value={[allCookies, setCookie]}>
            {children}
        </DropdownContext.Provider>
    );
}

// return in json
export function useCookie(cookieName: string) {
    const [allCookies, setCookie] = useContext(DropdownContext);
    return [allCookies[cookieName], setCookie] as const;
}
