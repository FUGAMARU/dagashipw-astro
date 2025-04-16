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
