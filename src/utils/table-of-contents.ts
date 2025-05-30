/**
 * @file 目次関連の関数群
 */

import { isDefined } from "@/utils"
import { generateUniqueHeadingId } from "@/utils/formatter"

import type {
  H2ItemStructure,
  H3ItemStructure,
  H4ItemStructure,
  TableOfContentsData
} from "@/types/table-of-contents"

/**
 * マークダウンから純粋なテキスト部分のみを抽出する
 *
 * @param markdown - マークダウン
 * @returns テキスト部分
 */
const extractPlainTextFromMarkdown = (markdown: string): string => {
  return markdown
    .replace(/```[\s\S]*?```/g, "") // コードブロックを削除
    .replace(/`([^`]+)`/g, "$1") // インラインコードを削除
    .replace(/!\[.*?\]\(.*?\)/g, "") // 画像を削除
    .replace(/\[([^\]]+)\]\(.*?\)/g, "$1") // リンクをテキスト部分のみに変換
    .replace(/<[^>]+>/g, "") // HTMLタグを削除
    .replace(/^#{1,6}\s+.*$/gm, "") // 見出しを削除
    .replace(/^\|.*\|$/gm, "") // テーブルを削除
    .replace(/^>.*$/gm, "") // 引用を削除
    .replace(/^\s*[-+*]\s+/gm, "") // 箇条書き（リスト）を削除
    .replace(/^\s*\d+\.\s+/gm, "") // 箇条書き（リスト）を削除
    .replace(/\n+/g, "\n") // 余分な改行を整理
    .trim()
}

/**
 * 記事本文から読了目安時間 (分) を計算する
 * 日本人の平均読書速度が1分間に400～600文字程度と言われているので、間を取って500文字/分として計算
 *
 * @param body - 記事本文
 * @returns 読了目安時間 (分)
 */
export const calculateReadingTime = (body: string): number => {
  const words = extractPlainTextFromMarkdown(body).length
  const readingTime = words / 500
  return readingTime < 1 ? parseFloat(readingTime.toFixed(1)) : Math.ceil(readingTime)
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
