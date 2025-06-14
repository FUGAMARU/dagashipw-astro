import node from "@astrojs/node"
import react from "@astrojs/react"
import { defineConfig } from "astro/config"

// https://astro.build/config
export default defineConfig({
  site: "https://dagashi.pw",
  integrations: [react()],
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
