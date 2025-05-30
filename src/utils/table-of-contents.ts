/**
 * @file 目次関連の関数群
 */

import { extractPlainTextFromMarkdown } from "@/utils/markdown"

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
