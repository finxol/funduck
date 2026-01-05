import { bangs } from "./bang"

async function switchTheme() {
    const theme = await cookieStore.get("theme")

    // Default theme is light, so set to dark if unset
    if (theme?.value === "light") {
        cookieStore.set("theme", "dark")
    } else {
        cookieStore.set("theme", "light")
    }

    checkTheme()
}

async function checkTheme() {
    const theme = await cookieStore.get("theme")

    if (theme) {
        if (theme.value === "light") {
            document.body.classList.add("light-theme")
        }
        if (theme.value === "dark") {
            document.body.classList.remove("light-theme")
        }

        const unsetThemeButton = document.querySelector<HTMLButtonElement>(
            ".unset-theme-button"
        )!
        unsetThemeButton.classList.remove("hide")
    } else if (new URL(window.location.href).searchParams.has("light")) {
        document.body.classList.add("light-theme")
    } else {
        document.body.classList.remove("light-theme")
    }
}

function noSearchDefaultPageRender() {
    const app = document.querySelector<HTMLDivElement>("#app")!
    app.classList.remove("cloak")

    void checkTheme()

    const copyButton = app.querySelector<HTMLButtonElement>(".copy-button")!
    const copyIcon = copyButton.querySelector("img")!
    const urlInput = app.querySelector<HTMLInputElement>(".url-input")!

    copyButton.addEventListener("click", async () => {
        await navigator.clipboard.writeText(urlInput.value)
        copyIcon.src = "/clipboard-check.svg"

        setTimeout(() => {
            copyIcon.src = "/clipboard.svg"
        }, 2000)
    })

    const themeButton = app.querySelector<HTMLButtonElement>(".theme-button")!
    themeButton.addEventListener("click", switchTheme)

    const unsetThemeButton = app.querySelector<HTMLButtonElement>(
        ".unset-theme-button"
    )!
    unsetThemeButton.addEventListener("click", async () => {
        await cookieStore.delete("theme")
        unsetThemeButton.classList.add("hide")
        checkTheme()
    })
}

const LS_DEFAULT_BANG = localStorage.getItem("default-bang") ?? "brave"
const defaultBang = bangs.find((b) => b.t === LS_DEFAULT_BANG)

function getBangredirectUrl() {
    const url = new URL(window.location.href)
    const query = url.searchParams.get("q")?.trim() ?? ""
    if (!query) {
        noSearchDefaultPageRender()
        return null
    }

    const kagiToken = url.searchParams.get("kagi_token")?.trim() ?? ""

    const match = query.match(/!(\S+)/i)

    const bangCandidate = match?.[1]?.toLowerCase()
    const resolvedBangCandidate = bangs.find((b) => b.t === bangCandidate)

    const selectedBang =
        (() => {
            if (!resolvedBangCandidate && kagiToken) {
                return bangs.find((b) => b.t === "kg")
            } else {
                return resolvedBangCandidate
            }
        })() ?? defaultBang

    // Remove the first bang from the query
    const cleanQuery = query.replace(/!\S+\s*/i, "").trim()

    // If the query is just `!gh`, use `github.com` instead of `github.com/search?q=`
    if (cleanQuery === "")
        return selectedBang ? `https://${selectedBang.d}` : null

    // Format of the url is:
    // https://www.google.com/search?q={{{s}}}
    let searchUrl = selectedBang?.u.replace(
        "{{{s}}}",
        // Replace %2F with / to fix formats like "!ghr+t3dotgg/unduck"
        encodeURIComponent(cleanQuery).replace(/%2F/g, "/")
    )

    if (!searchUrl) return null

    // Replace Kagi token only for Kagi bang
    if (selectedBang?.t === "kg") {
        searchUrl = searchUrl.replace("{{{kagi_token}}}", kagiToken)
    }

    return searchUrl
}

function doRedirect() {
    const searchUrl = getBangredirectUrl()
    if (!searchUrl) return
    window.location.replace(searchUrl)
}

doRedirect()
