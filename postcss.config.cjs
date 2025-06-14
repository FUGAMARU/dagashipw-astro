module.exports = {
  plugins: [
    require("@csstools/postcss-global-data")({
      files: ["./src/styles/custom-media-query.css"]
    }),
    require("postcss-custom-media"),
    require("postcss-mixins")({
      mixinsFiles: ["src/styles/mixin.css"]
    })
  ]
}
