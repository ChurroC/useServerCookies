"use client";

import { useEffect, useState } from "react";
import { getCookie } from "./context/cookie.context";

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

export function useStickyServerState<State>(key: string, defaultValue: State) {
    const [value, setValue] = useState(
        (getCookie(key) as State) ?? defaultValue
    );

    useOnChange(() => {
        if (typeof cookieStore !== "undefined") {
            cookieStore.set(key, value);
        } else {
            document.cookie = `${key}=${value};`;
        }
    }, [value]);

    return [value, setValue] as const;
}
