"use client";

import { useEffect, useState } from "react";
import { useCookie } from "./context/cookie.context";

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
    const [cookie, setCookie] = useState<CookieType>(() => {
        if (typeof window !== "undefined") {
            const cookieValue = useCookie(name);
            if (cookieValue) {
                return JSON.parse(cookieValue);
            } else {
                return defaultValue;
            }
        } else {
            if (typeof cookieStore !== "undefined") {
                cookieStore.get(name).then(cookie => {
                    if (cookie) {
                        return JSON.parse(cookie);
                    } else {
                        return defaultValue;
                    }
                });
            } else {
                const cookies = document.cookie.split(";");
                for (let i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i].split("=");
                    if (cookie[0].trim() === name) {
                        return JSON.parse(cookie[1]);
                    }
                }
                return defaultValue;
            }
        }
    });

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
