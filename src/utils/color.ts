/**
 * @file 色関連の関数群
 */

/**
 * HexからRGBに変換する
 *
 * @param hex - Hex
 * @returns RGBの配列
 */
export const convertHexToRGB = (hex: string): [number, number, number] => {
  const [, red, green, blue] = hex.match(/^#(..)(..)(..)$/) ?? []
  return [parseInt(red, 16), parseInt(green, 16), parseInt(blue, 16)]
}

/**
 * 背景色から文字色を白にするべきかを判定する
 * 参考: https://zenn.dev/mryhryki/articles/2020-11-12-hatena-background-color
 *
 * @param backgroundColorCode - 背景色
 * @returns 白文字色にするべきか
 */
export const determineWhiteTextColor = (backgroundColorCode: string): boolean => {
  const [red, green, blue] = convertHexToRGB(backgroundColorCode)

  const brightness = Math.floor(red * 0.299 + green * 0.587 + blue * 0.114)

  return brightness < 140
}
