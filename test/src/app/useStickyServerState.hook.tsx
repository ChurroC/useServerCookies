"use client";

import { useEffect, useState } from "react";
import { getCookie } from "./context/cookie.context";
import { number } from "zod";

declare const cookieStore: {
    get: (name: string) => Promise<{ value: string }>;
    set: (name: string, value: string) => void;
} & EventTarget;

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

interface CookieData<State> {
    value: State;
    expires?: number;
}

export function useStickyServerState<State>(key: string, defaultValue: State) {
    const [value, setValueOnly] = useState<CookieData<State>>({
        value: (getCookie(key) as State) ?? defaultValue
    });

    useOnChange(() => {
        if (typeof cookieStore !== "undefined") {
            cookieStore.set(key, JSON.stringify(value));
        } else {
            document.cookie = `${key}=${JSON.stringify(value)};`;
        }
    }, [value]);

    // add calback
    // function setValue({
    //     value,
    //     expires
    // }: {
    //     value: State;
    //     expires?: number;
    // }): void;
    // function setValue({
    //     callback,
    //     expires
    // }: {
    //     callback: (prevState: State) => State;
    //     expires?: number;
    // }): void;
    // function setValue(
    //     callback: (prevState: State) => State,
    //     expires?: number
    // ): void;
    // function setValue(newValue: State, expires?: number): void {
    //     if (typeof newValue === "function") {
    //         // This is if they give a callback function and an expiry time
    //         setValueOnly(prev => {
    //             const value = newValue(prev.value);
    //             return { value, ...(expires ? { expires } : {}) };
    //         });
    //     } else if (typeof newValue === "object") {
    //         if (typeof newValue.callback === "function") {
    //             const { callback, expires } = newValue;
    //             setValueOnly(prev => {
    //                 const value = newValue.callback(prev.value);
    //                 return {
    //                     value,
    //                     ...(expires ? { expires: newValue.expires } : {})
    //                 };
    //             });
    //         } else {
    //             setValueOnly({
    //                 value: newValue.value,
    //                 expires: newValue.expires
    //             });
    //         }
    //     } else {
    //         setValueOnly({ value: newValue });
    //     }
    // }

    const setValue = setValueOnly;
    return [value.value, setValue] as const;
}
