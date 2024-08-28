"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useCookie } from "@/context/cookie.context";


declare const cookieStore: {
    get: (name: string) => Promise<{ value: string }>;
    set: (name: string, value: string) => void;
} & EventTarget;

function useOnChange(
    callback: React.EffectCallback,
    dependancies: React.DependencyList
) {
    const hasMounted = useRef(false)

    // Page loads and sets hasMounted to true then next time dependacies change it will run the callback
    useEffect(() => {
        if (hasMounted.current) {
            return callback();
        } else {
            hasMounted.current = true
        }
    }, dependancies);
}

function hashCode(word: string) {
    let hash = 0
    let chr
    if (word.length === 0) return hash;
    for (let i = 0; i < word.length; i++) {
        chr = word.charCodeAt(i)
        hash = (hash << 5) - hash + chr
        hash |= 0
    }
    return hash
  }

export function useStickyServerState<CookieType>(
    key: string,
    defaultValue: CookieType
) {
    const serverCookie = useCookie(key);
    const [cookie, setCookie] = useState<CookieType>(serverCookie ? JSON.parse(serverCookie) as CookieType : defaultValue);

    // Update cookies when cookie state changes
    // Currently have a race condition for localStorage
    useOnChange(() => {
        if (typeof cookieStore !== "undefined") {
            cookieStore.set(key, JSON.stringify(cookie));
        } else {
            document.cookie = `${key}=${JSON.stringify(cookie)};`;
        }
        // This is easier than broadcast channel to modify the theme
        localStorage.setItem(key, hashCode(JSON.stringify(cookie)).toString());
    }, [cookie]);

    // This is checking for external changed in cookies
    useEffect(() => {
        // This is when another tabs theme changes
        // Was going to use broadcast api but this is easier since it runs on other tabs and doesnt run if localstorage is set to the value
        async function onStorageChange({ key: newKey, newValue }: StorageEvent) {
            console.log(key, newKey,hashCode(JSON.stringify(cookie)).toString(), newValue);
            // New value is just a hash to see if it is the same
            // If not then it will update the cookie
            if (key === newKey && newValue) {
                // Need to have dependency of cookie so hash is regenrated
                if (newValue !== hashCode(JSON.stringify(cookie)).toString()) {
                    if (typeof cookieStore !== "undefined") {
                        setCookie(JSON.parse((await cookieStore.get(key)).value) as CookieType);
                    } else {
                        setCookie(JSON.parse(document.cookie.match('(^|;)\\s*' + key + '\\s*=\\s*([^;]+)')?.pop() ?? '') as CookieType);
                    }
                }
            }
        }
        window.addEventListener("storage", onStorageChange);
        console.log("added event listener");

        return () => window.removeEventListener("storage", onStorageChange);
    }, [cookie]);

    return [cookie, setCookie] as const;
}