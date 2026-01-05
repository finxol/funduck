import defaultBangs from "./data/bang.json" with { type: "json" }

type Bang = (typeof defaultBangs)[number]

export const additionalBangs: Bang[] = [
    {
        c: "AI",
        d: "t3.chat",
        r: 0,
        s: "T3 Chat",
        sc: "AI",
        t: "t3",
        u: "https://t3.chat/new?model=gemini-3-flash&q={{{s}}}"
    },
    {
        c: "Online Services",
        d: "kagi.com",
        r: 0,
        s: "Kagi Search",
        sc: "Search",
        t: "kg",
        u: "https://kagi.com/search?q={{{s}}}&token={{{kagi_token}}}"
    }
]

export const bangs: Bang[] = [...additionalBangs, ...defaultBangs]
