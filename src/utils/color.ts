/**
 * @file 色関連の関数群
 */

/**
 * 背景色から文字色を白にするべきかを判定する
 * 参考: https://zenn.dev/mryhryki/articles/2020-11-12-hatena-background-color
 *
 * @param backgroundColorCode - 背景色
 * @returns 白文字色にするべきか
 */
export const determineWhiteTextColor = (backgroundColorCode: string): boolean => {
  const [, red, green, blue] = backgroundColorCode.match(/^#(..)(..)(..)$/) ?? []
  const redValue = parseInt(red, 16)
  const greenValue = parseInt(green, 16)
  const blueValue = parseInt(blue, 16)

  const brightness = Math.floor(redValue * 0.299 + greenValue * 0.587 + blueValue * 0.114)

  return brightness < 170
}
