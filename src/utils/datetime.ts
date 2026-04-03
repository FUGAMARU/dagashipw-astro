/**
 * @file 日時関連の関数群
 */

/**
 * 日時文字列を指定したフォーマットの文字列に変換する
 *
 * @param dateString - ISO形式の日時文字列
 * @param format - フォーマット形式
 * @returns 指定した形式にフォーマットされた日時文字列
 */
export const convertDateStringFormat = (
  dateString: string,
  format: "yyyy/MM/dd HH:mm:ss" | "yyyy-MM-dd" | "yyyy-MM-dd HH:mm" | "yyyy"
): string => {
  const date = new Date(dateString)
  const parts = new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23"
  }).formatToParts(date)

  const partMap = new Map(parts.map(part => [part.type, part.value]))

  const year = partMap.get("year") ?? ""
  const month = partMap.get("month") ?? ""
  const day = partMap.get("day") ?? ""
  const hours = partMap.get("hour") ?? ""
  const minutes = partMap.get("minute") ?? ""
  const seconds = partMap.get("second") ?? ""

  switch (format) {
    case "yyyy/MM/dd HH:mm:ss":
      return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`
    case "yyyy-MM-dd":
      return `${year}-${month}-${day}`
    case "yyyy-MM-dd HH:mm":
      return `${year}-${month}-${day} ${hours}:${minutes}`
    case "yyyy":
      return year
  }
}
