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
    },
    {
        c: "Online Services",
        d: "search.brave.com",
        r: 2791,
        s: "Brave Search",
        sc: "Search",
        t: "b",
        u: "https://search.brave.com/search?q={{{s}}}"
    },
    {
        c: "Online Services",
        d: "www.wordreference.com",
        r: 2791,
        s: "WordReference — en-fr",
        sc: "Translate",
        t: "enfr",
        u: "https://www.wordreference.com/enfr/{{{s}}}"
    },
    {
        c: "Online Services",
        d: "www.wordreference.com",
        r: 2791,
        s: "WordReference — fr-en",
        sc: "Translate",
        t: "fren",
        u: "https://www.wordreference.com/fren/{{{s}}}"
    },
    {
        c: "Tech",
        d: "npmx.dev",
        r: 71,
        s: "NPMx",
        sc: "Languages (javascript)",
        t: "npm",
        u: "https://npmx.dev/search?q={{{s}}}"
    },
    {
        c: "Tech",
        d: "formulae.brew.sh",
        r: 27,
        s: "Homebrew",
        sc: "Downloads (software)",
        t: "brew",
        u: "https://formulae.brew.sh/formula/{{{s}}}"
    }
]

const additionalBangTriggers = new Set(additionalBangs.map((b) => b.t))
export const bangs: Bang[] = [
    ...additionalBangs,
    ...defaultBangs.filter((b) => !additionalBangTriggers.has(b.t))
]
