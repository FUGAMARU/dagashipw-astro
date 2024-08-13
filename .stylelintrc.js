export default {
  extends: ["stylelint-config-standard", "stylelint-config-recess-order"],
  rules: {
    /** class名はkebab-caseを今回は使用しないので無効化 */
    "selector-class-pattern": null,
    /** PostCSSで使うがstylelintが認識してくれないので無視 */
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["define-mixin", "mixin"]
      }
    ]
  },
  ignoreFiles: ["**/node_modules/**"]
}
