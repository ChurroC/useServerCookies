"use client";

import { useEffect, useState } from "react";
import { useCookie } from "@/context/cookie.context";

function useOnChange(
    callback: React.EffectCallback,
    dependancies: React.DependencyList
) {
    const [hasMounted, setHasMounted] = useState(false);

    // Page loads and sets hasMounted to true then next time dependacies change it will run the callback
    useEffect(() => {
        if (hasMounted) {
            return callback();
        } else {
            setHasMounted(true);
        }
    }, dependancies);
}

export function useStickyServerState<CookieType>(
    name: string,
    defaultValue: CookieType
) {
    const serverCookie = useCookie(name);
    const [cookie, setCookie] = useState<CookieType>(serverCookie ? JSON.parse(serverCookie) as CookieType : defaultValue);

    // This is checking for external changed in cookies
    useEffect(() => {});

    // Update cookies when cookie state changes
    useOnChange(() => {
        if (typeof cookieStore !== "undefined") {
            void cookieStore.set(name, JSON.stringify(cookie));
        } else {
            document.cookie = `${name}=${JSON.stringify(cookie)};`;
        }
    }, [cookie]);

    return [cookie, setCookie] as const;
}

// maybe gives info on cookie expiry data
function cookieInfo() {}
