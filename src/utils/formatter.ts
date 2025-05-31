/**
 * @file データーをフォーマット(操作)するための関数群
 */

import { FALLBACK_HEADING_ID } from "@/constants/value"
import { isValidString } from "@/utils"
import { startSyncPipe } from "@/utils/pipe"

/**
 * カンマ区切りのstringをstringの配列に変換する
 *
 * @param str - カンマ区切りのstring
 * @returns stringの配列
 */
export const convertCommaSeparatedStringToArray = (str: string): Array<string> =>
  str.replace(/\s+/g, "").split(",")

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
export const normalizeHeadingText = (text: string): string =>
  startSyncPipe(text)
    .pipe(t => t.replace(/^\d/, ""))
    .pipe(t => t.replace(/\s+/g, "_"))
    // eslint-disable-next-line no-control-regex
    .pipe(t => t.replace(/[\x00-\x1F\x7F-\x9F]/g, ""))
    .value()

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
  let baseId = normalizeHeadingText(originalText)

  if (!isValidString(baseId)) {
    baseId = FALLBACK_HEADING_ID
  }

  const count = headingIdCountMap.get(baseId) ?? 0
  headingIdCountMap.set(baseId, count + 1)
  return count === 0 ? baseId : `${baseId}-${count}`
}
