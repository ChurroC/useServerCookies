declare const cookieStore: CookieStore;
declare const wow: string;
declare const MY_GLOBAL_CONSTANT: string;

interface Cookie {
    domain?: string;
    expires?: number;
    name: string;
    path?: string;
    secure?: boolean;
    sameSite?: CookieSameSite;
    value: string;
}
interface CookieStoreDeleteOptions {
    name: string;
    domain?: string;
    path?: string;
}
interface CookieStoreGetOptions {
    name?: string;
    url?: string;
}
declare enum CookieSameSite {
    strict = "strict",
    lax = "lax",
    none = "none"
}
interface CookieListItem {
    name?: string;
    value?: string;
    domain: string | null;
    path?: string;
    expires: Date | number | null;
    secure?: boolean;
    sameSite?: CookieSameSite;
}
declare type CookieList = CookieListItem[];
interface CookieChangeEventInit extends EventInit {
    changed: CookieList;
    deleted: CookieList;
}
declare class CookieChangeEvent extends Event {
    changed: CookieList;
    deleted: CookieList;
    constructor(type: string, eventInitDict?: CookieChangeEventInit);
}
declare class CookieStore extends EventTarget {
    onchange?: (event: CookieChangeEvent) => void;
    get [Symbol.toStringTag](): "CookieStore";
    constructor();
    get(
        init?: CookieStoreGetOptions["name"] | CookieStoreGetOptions
    ): Promise<Cookie | undefined>;
    set(init: CookieListItem | string, possibleValue?: string): Promise<void>;
    getAll(
        init?: CookieStoreGetOptions["name"] | CookieStoreGetOptions
    ): Promise<Cookie[]>;
    delete(
        init: CookieStoreDeleteOptions["name"] | CookieStoreDeleteOptions
    ): Promise<void>;
}
interface CookieStoreGetOptions {
    name?: string;
    url?: string;
}
declare class CookieStoreManager {
    get [Symbol.toStringTag](): string;
    constructor();
    subscribe(subscriptions: CookieStoreGetOptions[]): Promise<void>;
    getSubscriptions(): Promise<CookieStoreGetOptions[]>;
    unsubscribe(subscriptions: CookieStoreGetOptions[]): Promise<void>;
}
declare global {
    interface Window {
        CookieStore: typeof CookieStore;
        cookieStore: CookieStore;
        CookieChangeEvent: typeof CookieChangeEvent;
        CookieStoreManager: typeof CookieStoreManager;
    }
    interface ServiceWorkerRegistration {
        cookies: CookieStoreManager;
    }
}
declare const cookieStore: CookieStore;
export { cookieStore, CookieStore, CookieChangeEvent };
