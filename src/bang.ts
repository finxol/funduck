import defaultBangs from "./data/bang.json" with { type: "json" }

type Bang = (typeof defaultBangs)[0]

export const additionalBangs: Bang[] = [
    {
        c: "AI",
        d: "www.t3.chat",
        r: 0,
        s: "T3 Chat",
        sc: "AI",
        t: "t3",
        u: "https://www.t3.chat/new?q={{{s}}}"
    },
    {
        c: "Online Services",
        d: "kagi.com",
        r: 0,
        s: "Kagi Search",
        sc: "Search",
        t: "kg",
        u: "https://www.t3.chat/new?q={{{s}}}"
    }
]

export const bangs: Bang[] = [...additionalBangs, ...defaultBangs]
