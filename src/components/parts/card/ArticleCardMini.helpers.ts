/**
 * 経過日数文字列を取得する
 *
 * @param baseDate - 基準日
 * @returns 経過日数文字列
 */
export const getElapsedTimeString = (baseDate: Date): string => {
  const now = new Date()
  // 入力日付が未来の場合は0日前とする
  if (baseDate.getTime() > now.getTime()) {
    return "0日前"
  }

  const diffMilliseconds = now.getTime() - baseDate.getTime()
  const diffDays = Math.floor(diffMilliseconds / (1000 * 60 * 60 * 24))

  if (diffDays < 7) {
    // 7日未満は「n日前」
    return `${diffDays}日前`
  } else if (diffDays < 30) {
    // 7日以上30日未満は「n週間前」
    const weeks = Math.floor(diffDays / 7)
    return `${weeks}週間前`
  } else if (diffDays < 365) {
    // 30日以上365日未満は「nか月前」
    const months = Math.floor(diffDays / 30)
    return `${months}か月前`
  } else {
    // 365日以上は「n年前」
    const years = Math.floor(diffDays / 365)
    return `${years}年前`
  }
}
