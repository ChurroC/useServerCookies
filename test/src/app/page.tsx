"use client";

import { useStickyServerState } from "./useStickyServerState.hook";

let i = 1;
export default function HomePage() {
    console.log(i++)
    const [name, setName, setKey] = useStickyServerState("name", "wow");

    return (
        <div className="flex h-screen flex-col items-center justify-center gap-4">
            <div>Your Name is {name === "" ? "Unknown" : name.trim()}</div>
            <input
                name="nameInput"
                value={name}
                className="border rounded-md shadow-sm"
                onChange={event => {
                    setName(event.target.value);
                    setKey("bob")
                }}
            />
        </div>
    );
}