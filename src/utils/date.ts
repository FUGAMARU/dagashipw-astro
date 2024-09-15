/**
 * @file 日時操作関連の関数群
 */

/**
 * 記事を投稿（更新）してからの経過年数を取得する
 *
 * @param articleDate - 記事の投稿（更新）日時
 * @returns 経過年数
 */
export const getElapsedYears = (articleDate: Date): number => {
  const now = new Date()
  const elapsedMilliseconds = now.getTime() - articleDate.getTime()
  const elapsedYears = elapsedMilliseconds / (1000 * 60 * 60 * 24 * 365)
  return Math.floor(elapsedYears)
}

/**
 * 現在の日時をyyyy/MM/dd HH:mm:ssの形式で取得する
 *
 * @returns yyyy/MM/dd HH:mm:ss
 */
export const getCurrentDateTime = (): string => {
  const now = new Date()
  const year = now.getFullYear()
  const month = `0${now.getMonth() + 1}`.slice(-2)
  const day = `0${now.getDate()}`.slice(-2)
  const hours = `0${now.getHours()}`.slice(-2)
  const minutes = `0${now.getMinutes()}`.slice(-2)
  const seconds = `0${now.getSeconds()}`.slice(-2)
  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`
}
