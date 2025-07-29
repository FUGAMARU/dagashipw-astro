export default {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-recess-order",
    "@css-modules-kit/stylelint-plugin/recommended"
  ],
  rules: {
    /** class名はkebab-caseを今回は使用しないので無効化 */
    "selector-class-pattern": null,
    /** PostCSSで使うがstylelintが認識してくれないので無視 */
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["define-mixin", "mixin"]
      }
    ],
    /** Astroコンポーネントだとバグる問題への暫定対応 */
    "css-modules-kit/no-missing-component-file": null
  },
  ignoreFiles: ["**/node_modules/**", "dist/**", "src/styles/destyle.css"]
}
