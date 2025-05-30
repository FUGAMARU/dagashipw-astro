/**
 * @file データーをフォーマット(操作)するための関数群
 */

import { API_ORIGIN } from "@/constants/env"
import { CMS_IMAGE_DIRECTORY, MARKDOWN_IMAGE_EXTENSIONS } from "@/constants/value"
import { isDefined } from "@/utils"
import { getLightweightImageUrl } from "@/utils/image"

/**
 * カンマ区切りのstringをstringの配列に変換する
 *
 * @param str - カンマ区切りのstring
 * @returns stringの配列
 */
export const convertCommaSeparatedStringToArray = (str: string): Array<string> =>
  str.replace(/\s+/g, "").split(",")

/**
 * Markdown中の画像URLを軽量化された画像URLに置き換える
 *
 * @param markdown - Markdown文字列
 * @returns 軽量化された画像URLに置き換えられたMarkdown文字列
 */
export const convertMarkdownImageUrlToLightweightImageUrl = async (
  markdown: string
): Promise<string> => {
  const originEscaped = API_ORIGIN.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")
  const pattern =
    originEscaped +
    `/${CMS_IMAGE_DIRECTORY}/[A-Za-z0-9._~:/?#\\[\\]@!$&'()*+,;=-]+?\\.(?:${MARKDOWN_IMAGE_EXTENSIONS})`
  const uploadUrlPattern = new RegExp(pattern, "g")

  const matches = markdown.match(uploadUrlPattern) ?? []
  const replacements = await Promise.all(matches.map(url => getLightweightImageUrl(url)))

  return matches.reduce((result, url, index) => result.replace(url, replacements[index]), markdown)
}

/**
 * エスケープされた改行コードをアンエスケープする
 * (Strapiがデフォルトで改行コードをエスケープしてレスポンスしてくるため)
 *
 * @param body - エスケープされた改行コードを含む文字列
 * @returns 改行コードがアンエスケープされた文字列
 */
export const unescapeNewlines = (body: string): string => JSON.parse(`"${body}"`)

/**
 * 角括弧で囲まれた特定の文字列を別の文字列に置き換える関数
 *
 * @param baseTemplate - 置き換え元のテンプレート文字列
 * @param targetString - 置き換えたい文字列 (括弧を含まない)
 * @param replacement - 置き換え後の文字列
 * @returns 置き換え後の文字列全文
 */
export const replaceTextInSquareBracket = (
  baseTemplate: string,
  targetString: string,
  replacement: string
): string => {
  const regex = new RegExp(`\\[${targetString}\\]`, "g")
  return baseTemplate.replace(regex, replacement)
}

/**
 * 見出しテキストを正規化する (これを基にアンカーリンク用のIDを生成する)
 *
 * @param text - 元の見出しテキスト
 * @returns 正規化された見出しテキスト
 */
export const normalizeHeadingText = (text: string): string => {
  const withoutLeadingDigit = text.replace(/^\d/, "")

  const sanitized = withoutLeadingDigit.replace(
    /[^A-Za-z0-9\u3040-\u309F\u30A0-\u30FF\u3400-\u4DBF\u4E00-\u9FFFー_-]/g,
    ""
  )

  return sanitized.replace(/\s/g, "")
}

/**
 * 見出し用IDを生成する
 * IDが重複しそうな場合は接尾辞としてインデックスを付与する
 *
 * @param originalText - 元の見出しテキスト
 * @param headingIdCountMap - 見出しID（ベースID）の出現回数を記録するMapオブジェクト (呼び出し側で初期化・管理されこの関数によって更新される)
 * @returns 見出し用ID
 */
export const generateUniqueHeadingId = (
  originalText: string,
  headingIdCountMap: Map<string, number>
): string => {
  const baseId = normalizeHeadingText(originalText)
  const count = headingIdCountMap.get(baseId) ?? 0

  headingIdCountMap.set(baseId, count + 1)

  return count === 0 ? baseId : `${baseId}-${count}`
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
