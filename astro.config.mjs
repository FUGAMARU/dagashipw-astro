import react from "@astrojs/react"
import { defineConfig } from "astro/config"

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  output: "hybrid" // index.astroでクエリパラメーターを取得するためにSSRする必要がある
})
