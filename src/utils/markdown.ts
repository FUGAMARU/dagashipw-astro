/**
 * @file Markdown関連の関数群
 */

import { isDefined } from "@/utils"
import { generateUniqueHeadingId } from "@/utils/formatter"

import type {
  TableOfContentsData,
  H2ItemStructure,
  H3ItemStructure,
  H4ItemStructure
} from "@/types/table-of-contents"

/**
 * マークダウンから純粋なテキスト部分のみを抽出する
 *
 * @param markdown - マークダウン
 * @param replaceNewlineWithSpace - 改行をスペースに変換するか（デフォルト: false）
 * @param trimLength - 先頭から何文字だけ返すか（省略時は全体）
 * @returns テキスト部分
 */
export const extractPlainTextFromMarkdown = (
  markdown: string,
  replaceNewlineWithSpace: boolean = false,
  trimLength?: number
): string => {
  let text = markdown
    .replace(/```[\s\S]*?```/g, "") // コードブロックを削除
    .replace(/`([^`]+)`/g, "$1") // インラインコードを削除
    .replace(/!\[.*?\]\(.*?\)/g, "") // 画像を削除
    .replace(/\[([^\]]+)]\(.*?\)/g, "$1") // リンクをテキスト部分のみに変換
    .replace(/<[^>]+>/g, "") // HTMLタグを削除
    .replace(/^#{1,6}\s+.*$/gm, "") // 見出しを削除
    .replace(/^\|.*\|$/gm, "") // テーブルを削除
    .replace(/^>.*$/gm, "") // 引用を削除
    .replace(/^\s*[-+*]\s+/gm, "") // 箇条書き（リスト）を削除
    .replace(/^\s*\d+\.\s+/gm, "") // 箇条書き（リスト）を削除

  text = replaceNewlineWithSpace ? text.replace(/\n+/g, " ") : text.replace(/\n+/g, "\n")

  text = text.trim()

  if (isDefined(trimLength) && trimLength > 0) {
    return text.substring(0, trimLength)
  }
  return text
}

/**
 * Markdownから目次データーを生成する
 *
 * @param markdown - Markdown文字列
 * @returns 目次データー
 */
export const generateTableOfContentsFormat = (markdown: string): TableOfContentsData => {
  const headingIdCountMap = new Map<string, number>()
  const lines = markdown.split("\n")
  const tocResult: TableOfContentsData = []

  let currentH2: H2ItemStructure | undefined
  let currentH3: H3ItemStructure | undefined

  lines.forEach(line => {
    const h2Match = line.match(/^##\s+(.*?)(?:\s*#+\s*)?$/)
    const h3Match = line.match(/^###\s+(.*?)(?:\s*#+\s*)?$/)
    const h4Match = line.match(/^####\s+(.*?)(?:\s*#+\s*)?$/)

    if (isDefined(h2Match)) {
      const originalHeadingText = h2Match[1].trim()
      const id = generateUniqueHeadingId(originalHeadingText, headingIdCountMap)
      currentH2 = {
        title: originalHeadingText,
        href: `#${id}`
      }
      tocResult.push({ h2: currentH2 })
      currentH3 = undefined
      return
    }

    if (isDefined(h3Match) && isDefined(currentH2)) {
      const originalHeadingText = h3Match[1].trim()
      const id = generateUniqueHeadingId(originalHeadingText, headingIdCountMap)
      currentH3 = {
        title: originalHeadingText,
        href: `#${id}`
      }
      currentH2.h3 = currentH2.h3 ?? []
      currentH2.h3.push(currentH3)
      return
    }

    if (!(isDefined(h4Match) && isDefined(currentH3))) {
      return
    }

    const originalHeadingText = h4Match[1].trim()
    const id = generateUniqueHeadingId(originalHeadingText, headingIdCountMap)
    const h4Item: H4ItemStructure = {
      title: originalHeadingText,
      href: `#${id}`
    }
    currentH3.h4 = currentH3.h4 ?? []
    currentH3.h4.push(h4Item)
  })

  return tocResult
}

/**
 * Markdown内の見出し文字列を見出しコンポーネント用のJSX(のようなもの)に書き換える
 *
 * @param markdown - Markdown
 * @returns 見出しが見出しコンポーネント呼び出し用文字列に変換されたMarkdown
 */
export const convertMarkdownHeadingsToHtml = (markdown: string): string => {
  const headingIdCountMap = new Map<string, number>()
  const lines = markdown.split("\n")

  const processedLines = lines.map(line => {
    const headingMatch = line.match(/^(#{1,4})\s+(.*?)(?:\s*#+\s*)?$/)

    if (!isDefined(headingMatch)) {
      return line
    }

    const level = headingMatch[1].length
    const originalHeadingText = headingMatch[2].trim()

    const uniqueId = generateUniqueHeadingId(originalHeadingText, headingIdCountMap)

    return `<H${level} id="${uniqueId}">${originalHeadingText}</H${level}>`
  })

  return processedLines.join("\n")
}
