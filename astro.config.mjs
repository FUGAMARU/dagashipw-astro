import node from "@astrojs/node"
import partytown from "@astrojs/partytown"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import { defineConfig } from "astro/config"

// https://astro.build/config
export default defineConfig({
  site: "https://dagashi.pw",
  integrations: [
    react(),
    sitemap({
      /** サイトマップに含めるページのフィルター */
      filter: page => !page.includes("/umami-control")
    }),
    partytown()
  ],
  adapter: node({
    mode: "standalone"
  }),
  vite: {
    css: {
      modules: {
        generateScopedName:
          process.env.NODE_ENV === "production"
            ? "[hash:base64:8]"
            : "[name]__[local]___[hash:base64:5]"
      }
    }
  }
})
