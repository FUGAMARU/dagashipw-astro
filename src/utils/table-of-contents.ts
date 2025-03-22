/**
 * @file 目次関連の関数群
 */

import { isDefined } from "@/utils"
import { generateHeadingId } from "@/utils/formatter"

import type { NestedHeading, TableOfContentsData } from "@/types/table-of-contents"

/**
 * Markdownから目次データを生成する
 *
 * @param markdown - Markdown
 * @returns 目次データ
 */
export const generateTableOfContentsFromMarkdown = (markdown: string): TableOfContentsData => {
  const lines = markdown.split("\n")
  const data: TableOfContentsData = []

  let currentH2:
    | (NestedHeading & {
        /** h3 */
        h3?: Array<
          NestedHeading & {
            /** h4 */
            h4?: Array<NestedHeading>
          }
        >
      })
    | null = null
  let currentH3:
    | (NestedHeading & {
        /** h4 */
        h4?: Array<NestedHeading>
      })
    | null = null
  let currentH4: NestedHeading | null = null

  lines.forEach(line => {
    const h2Match = line.match(/^## (.+)/)
    const h3Match = line.match(/^### (.+)/)
    const h4Match = line.match(/^#### (.+)/)

    if (isDefined(h2Match)) {
      currentH2 = {
        title: h2Match[1],
        href: `#${generateHeadingId(h2Match[1])}`
      }
      data.push({ h2: currentH2 })
      currentH3 = null
      currentH4 = null
      return
    }
    if (isDefined(h3Match) && isDefined(currentH2)) {
      currentH3 = {
        title: h3Match[1],
        href: `#${generateHeadingId(h3Match[1])}`
      }
      currentH2.h3 = currentH2.h3 ?? []
      currentH2.h3.push(currentH3)
      currentH4 = null
      return
    }
    if (!(isDefined(h4Match) && isDefined(currentH3))) {
      return
    }
    currentH4 = {
      title: h4Match[1],
      href: `#${generateHeadingId(h4Match[1])}`
    }
    currentH3.h4 = currentH3.h4 ?? []
    currentH3.h4.push(currentH4)
  })

  return data
}

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
