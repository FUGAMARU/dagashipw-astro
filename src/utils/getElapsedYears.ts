/**
 * 記事を投稿（更新）してからの経過年数を取得する
 * @param articleDate 記事の投稿（更新）日時
 * @returns 経過年数
 */
export const getElapsedYears = (articleDate: Date): number => {
  const now = new Date()
  const elapsedMilliseconds = now.getTime() - articleDate.getTime()
  const elapsedYears = elapsedMilliseconds / (1000 * 60 * 60 * 24 * 365)
  return Math.floor(elapsedYears)
}
