import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa"
import { viteSingleFile } from "vite-plugin-singlefile"

export default defineConfig({
    plugins: [
        VitePWA({
            registerType: "autoUpdate"
        }),
        viteSingleFile()
    ]
})
