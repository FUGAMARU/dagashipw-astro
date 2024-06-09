import autoStoryGenerator from "@takuma-ru/auto-story-generator"
import { mergeConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
import { resolve } from "node:path"

import type { StorybookConfig } from "@storybook/react-vite"

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [
        tsconfigPaths(),
        autoStoryGenerator.vite({
          preset: "react",
          imports: ["src/components/**/*.tsx"],
          prettierConfigPath: resolve(__dirname, "../.prettierrc.js")
        })
      ]
    })
  }
}
export default config
