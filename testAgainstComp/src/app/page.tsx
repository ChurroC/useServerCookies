"use client";

import { getCookie, setCookie } from "cookies-next";

export default function HomePage() {
  const name = getCookie("name") ?? "";

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <div>Your Name is {name === "" ? "Unknown" : name.trim()}</div>
      <input
        name="nameInput"
        value={name}
        className="rounded-md border shadow-sm"
        onChange={(event) => {
          setCookie("name", event.target.value);
        }}
      />
    </div>
  );
}
