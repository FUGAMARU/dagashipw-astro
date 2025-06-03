import { isDefined } from "@/utils"

/**
 * 日付情報を取得する
 *
 * @param dateIsoString - ISO8601形式の日付文字列
 * @returns 年、月、日、曜日
 */
export const getInfoBarDateInfo = (
  dateIsoString?: string
):
  | {
      /** 年 */
      year: number
      /** 月 */
      month: string
      /** 日 */
      day: string
      /** 曜日 */
      dayOfWeek: string
    }
  | undefined => {
  if (!isDefined(dateIsoString)) {
    return undefined
  }

  const date = new Date(dateIsoString)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  const dayOfWeek = date.getDay()

  const weekday = ["日", "月", "火", "水", "木", "金", "土"]

  return {
    year,
    month,
    day,
    dayOfWeek: weekday[dayOfWeek]
  }
}
