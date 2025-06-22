/**
 * @file 日時関連の関数群
 */

/**
 * Dateオブジェクトを指定したフォーマットの文字列に変換する
 *
 * @param date - Dateオブジェクト
 * @param format - フォーマット形式
 * @returns 指定した形式にフォーマットされた日時文字列
 */
export const formatDateToString = (
  date: Date,
  format: "yyyy/MM/dd" | "yyyy/MM/dd HH:mm:ss" | "yyyy"
): string => {
  const year = date.getFullYear()
  const month = `0${date.getMonth() + 1}`.slice(-2)
  const day = `0${date.getDate()}`.slice(-2)
  const hours = `0${date.getHours()}`.slice(-2)
  const minutes = `0${date.getMinutes()}`.slice(-2)
  const seconds = `0${date.getSeconds()}`.slice(-2)

  switch (format) {
    case "yyyy/MM/dd":
      return `${year}/${month}/${day}`
    case "yyyy/MM/dd HH:mm:ss":
      return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`
    case "yyyy":
      return `${year}`
  }
}

/**
 * UTCをJSTに変換する
 *
 * @param date - UTCのDateオブジェクト
 * @returns JSTのDateオブジェクト
 */
export const convertUTCToJST = (date: Date): Date => {
  // UTCをJSTに変換するために9時間(32400000ミリ秒)を加算
  return new Date(date.getTime() + 32400000)
}
