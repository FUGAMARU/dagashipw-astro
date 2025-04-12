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

/**
 * マークダウンに目次挿入用のコンポーネントを挿入する
 *
 * @param markdown - マークダウン
 * @returns 目次挿入後のマークダウン (h2が見つからない場合はそのまま返す)
 */
export const insertTableOfContentsToMarkdown = (markdown: string): string => {
  const headingRegex = /##\s/

  const parts = markdown.split(headingRegex)

  return parts.length > 1
    ? `${parts[0]}<Inserter type="tableOfContents" />\n\n## ${parts.slice(1).join("## ")}`
    : markdown
}
