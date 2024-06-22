/**
 * 日付文字列をyyyy/MM/dd形式に整形する
 * @param dateString 日付文字列
 * @returns yyyyMM/dd
 */
export const formatDateString = (dateString: string): string => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = `0${date.getMonth() + 1}`.slice(-2)
  const day = `0${date.getDate()}`.slice(-2)
  return `${year}/${month}/${day}`
}
