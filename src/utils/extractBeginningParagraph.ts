import { EXTRACTED_PARAGRAPHS_LENGTH } from "@/constants/value"

/**
 * 記事のMarkdownテキストから冒頭の段落を抽出し、所定の文字数だけ切り取る
 * @param markdown Markdown
 * @returns 所定の文字数で切り取られた段落
 */
export const extractBeginningParagraph = (markdown: string): string => {
  const paragraphs = markdown
    // Markdownリンクのテキスト部分だけを抽出
    .replace(/\[([^\]]+)]\([^)]+\)/g, "$1")
    // Markdown画像を削除
    .replace(/!\[[^\]]*]\([^)]+\)/g, "")
    // HTMLタグを削除し、タグ内のテキストを保持
    .replace(/<\/?[^>]+(>|$)/g, "")
    // 見出しなどの余計なものを削除
    .replace(/(^|\n)(#+\s|<[^>]+>)/g, "")
    // 改行をスペースに変換
    .replace(/\n+/g, " ")
    // 不要なスペースをトリム
    .trim()

  return paragraphs.substring(0, EXTRACTED_PARAGRAPHS_LENGTH)
}
