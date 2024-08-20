"use client";

import { useCookie } from "@/context/cookie.context";

export default function HomePage() {
    const [cookie, setCookie] = useCookie("name");

    return (
        <div className="flex h-screen flex-col items-center justify-center gap-4">
            <div>Your Name is {cookie === "" ? "Unknown" : cookie?.trim()}</div>
            <input
                name="nameInput"
                value={cookie}
                className="border rounded-md shadow-sm"
                onChange={event => {
                    setCookie(event.target.value);
                }}
            />
        </div>
    );
}
