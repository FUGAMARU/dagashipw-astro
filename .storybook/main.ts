// This file has been automatically migrated to valid ESM format by Storybook.
import { fileURLToPath } from "node:url";
import autoStoryGenerator from "@takuma-ru/auto-story-generator"
import { mergeConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
import { resolve, dirname } from "node:path";

import type { StorybookConfig } from "@storybook/react-vite"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@chromatic-com/storybook",
    "@storybook/addon-docs"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  staticDirs: ["../dummy-images"],
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [
        tsconfigPaths(),
        autoStoryGenerator.vite({
          preset: "react",
          imports: ["src/components/**/*.tsx"],
          ignores: ["src/components/views/**/*.tsx"],
          prettierConfigPath: resolve(__dirname, "../.prettierrc.js")
        })
      ]
    })
  }
}
export default config
