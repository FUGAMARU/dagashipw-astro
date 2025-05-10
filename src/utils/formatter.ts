/**
 * @file データーをフォーマット(操作)するための関数群
 */

import { isValidElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"

import { API_ORIGIN } from "@/constants/env"
import { CMS_IMAGE_DIRECTORY, MARKDOWN_IMAGE_EXTENSIONS } from "@/constants/value"
import { isDefined } from "@/utils"

import type { ReactElement, ReactNode } from "react"

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
   * ReactNodeがオブジェクトであり、特定のプロパティを持つかチェックする
   *
   * @param node - ReactNode
   * @returns - nodeがReactElementであり、propsプロパティを持つ場合はtrue、それ以外はfalse
   */
  const checkHasProps = (
    node: ReactNode
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): node is ReactElement<any> & {
    /** props */
    props: object
  } => {
    return isValidElement(node) && typeof node.props === "object" && node.props !== null
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

    if (checkHasProps(node)) {
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

/**
 * Markdown中の画像URLを軽量化された画像URLに置き換える
 *
 * @param markdown - Markdown文字列
 * @returns 軽量化された画像URLに置き換えられたMarkdown文字列
 */
export const convertMarkdownImageUrlToLightweightImageUrl = async (
  markdown: string
): Promise<string> => {
  const imageUtils = await import("@/utils/image")

  const originEscaped = API_ORIGIN.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")
  const pattern =
    originEscaped +
    `/${CMS_IMAGE_DIRECTORY}/[A-Za-z0-9._~:/?#\\[\\]@!$&'()*+,;=-]+?\\.(?:${MARKDOWN_IMAGE_EXTENSIONS})`
  const uploadUrlPattern = new RegExp(pattern, "g")

  return markdown.replace(uploadUrlPattern, url => imageUtils.getLightweightImageUrl(url))
}
