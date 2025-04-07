/**
 * @file データーをフォーマット(操作)するための関数群
 */

import { isValidElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"

import { EXTRACTED_PARAGRAPHS_LENGTH } from "@/constants/value"
import { isDefined } from "@/utils"
import { API_ORIGIN } from "scripts/utils"

import type { ArticleInfo } from "@/types/article"
import type { components } from "@/types/schema"
import type { ReactNode } from "react"

/** サムネイルからテーマカラーを取得できなかった場合のフォールバック色 */
const FALLBACK_THEME_COLOR = "#343434"

/**
 * CMSから取得した記事情報を内部的に扱いやすいフォーマットに整形する
 *
 * @param articleInfo - 記事情報
 * @returns 整形された記事情報
 */
export const formatArticleInfo = async (
  articleInfo: components["schemas"]["Article"]
): Promise<ArticleInfo> => {
  const thumbnailUrl = `${API_ORIGIN}${articleInfo.thumbnail.url}`

  /**
   * 記事のMarkdownテキストから冒頭の段落を抽出し、所定の文字数だけ切り取る
   *
   * @param markdown - Markdown
   * @returns 所定の文字数で切り取られた段落
   */
  const extractBeginningParagraph = (markdown: string): string => {
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

  /**
   * 日付文字列をyyyy/MM/dd形式に整形する
   *
   * @param dateString - 日付文字列
   * @returns yyyyMM/dd
   */
  const formatDateString = (dateString: string): string => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = `0${date.getMonth() + 1}`.slice(-2)
    const day = `0${date.getDate()}`.slice(-2)
    return `${year}/${month}/${day}`
  }

  const baseData = {
    articleUrlId: articleInfo.articleUrlId,
    backNumber: 1, // TODO: 実際の値を反映させる必要がある
    title: articleInfo.title,
    thumbnailUrl,
    themeColor: articleInfo.themeColor ?? FALLBACK_THEME_COLOR,
    tags: (articleInfo.tags as Array<string>) ?? [],
    bodyBeginningParagraph: extractBeginningParagraph(articleInfo.body),
    commentCount: 1 // TODO: 実際の値を反映させる必要がある
  } as const satisfies Partial<ArticleInfo>

  // 記事作成日はforceCreatedAtが指定されていればその値を優先して使用する
  const createdAtData = articleInfo.forceCreatedAt ?? articleInfo.createdAt

  if (!isDefined(createdAtData)) {
    throw new Error("記事作成日のデーターが存在しません")
  }

  const createdAt = formatDateString(createdAtData)

  // 記事更新日はforceUpdatedAtだけを使用する
  const updatedAt = articleInfo.forceUpdatedAt

  return {
    ...baseData,
    createdAt,
    updatedAt: isDefined(updatedAt) ? formatDateString(updatedAt) : undefined
  }
}

/**
 * マークダウンに目次挿入用のコンポーネントを挿入する
 *
 * @param markdown - マークダウン
 * @returns 目次挿入後のマークダウン (h2が見つからない場合はそのまま返す)
 */
export const insertTableOfContents = (markdown: string): string => {
  const headingRegex = /##\s/

  const parts = markdown.split(headingRegex)

  return parts.length > 1
    ? `${parts[0]}<Inserter type="tableOfContents" />\n\n## ${parts.slice(1).join("## ")}`
    : markdown
}

/**
 * 見出し用のIDを生成する関数
 *
 * @param text - ReactNode | string
 * @returns ID
 */
export const generateHeadingId = (text: ReactNode | string): string => {
  /**
   * HTMLタグで囲まれた中身のテキストを抽出する
   *
   * @param html - HTML文字列
   * @returns - 抽出されたテキスト
   */
  const extractTextFromHTMLTag = (html: string): string => {
    const regex = /<[^>]*>([^<]*)<\/[^>]*>/
    const match = html.match(regex)
    return isDefined(match) ? match[1] : ""
  }

  /**
   * childrenからテキストの部分を抽出する
   *
   * @param node - ReactNode
   * @returns 文字列に変換されたReactNode
   */
  const extractTextFromChildren = (node: ReactNode): string => {
    if (typeof node === "string" || typeof node === "number") {
      return node.toString()
    }

    if (Array.isArray(node)) {
      return node.map(extractTextFromChildren).join("")
    }

    if (isValidElement(node)) {
      if (
        isDefined(node.props) &&
        isDefined(node.props.value) &&
        typeof node.props.value === "string"
      ) {
        return node.props.value
      }

      if (isDefined(node.props) && isDefined(node.props.children)) {
        return extractTextFromChildren(node.props.children)
      }

      return renderToStaticMarkup(node)
    }

    return ""
  }

  const targetText =
    typeof text === "string" ? text : extractTextFromHTMLTag(extractTextFromChildren(text))

  return targetText
    .replace(/^\d/, "") // 先頭が数字の場合は削除
    .replace(/[^A-Za-z0-9\u3040-\u309F\u30A0-\u30FF\u3400-\u4DBF\u4E00-\u9FFFー_-]/g, "") // 英数字と日本語と一部記号以外を削除
    .replace(/\s/g, "") // 空白を削除
}

/**
 * カンマ区切りのstringをstringの配列に変換する
 *
 * @param str - カンマ区切りのstring
 * @returns stringの配列
 */
export const convertCommaSeparatedStringToArray = (str: string): Array<string> =>
  str.replace(/\s+/g, "").split(",")
