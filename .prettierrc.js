export default {
  singleQuote: false,
  jsxSingleQuote: false,
  quoteProps: "as-needed",
  useTabs: false,
  tabWidth: 2,
  semi: false,
  trailingComma: "none",
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "avoid",
  printWidth: 100,
  plugins: ["prettier-plugin-astro"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro"
      }
    }
  ]
}
