declare interface CookieStore {
    get(name: string): Promise<CookieValue | null>
    set(
        name: string,
        value: string,
        options?: CookieStoreSetOptions
    ): Promise<void>
    delete(name: string): Promise<void>
    getAll(name?: string): Promise<CookieValue[]>
}

declare interface CookieValue {
    domain?: string
    expires?: number
    httpOnly?: boolean
    name: string
    path?: string
    sameSite?: "strict" | "lax" | "none"
    secure?: boolean
    value: string
}

declare interface CookieStoreSetOptions {
    expires?: number | Date
    domain?: string
    path?: string
    sameSite?: "strict" | "lax" | "none"
    secure?: boolean
    httpOnly?: boolean
}

declare global {
    const cookieStore: CookieStore
}
