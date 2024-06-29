import { isValidElement, type ReactNode } from "react"
import { renderToStaticMarkup } from "react-dom/server"

import { isDefined } from "@/utils/isDefined"

/**
 * childrenからテキストの部分を抽出する関数
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

/**
 * HTMLタグで囲まれた中身のテキストを抽出する
 * @param html - HTML文字列
 * @returns - 抽出されたテキスト
 */
const extractTextFromHTMLTag = (html: string): string => {
  const regex = /<[^>]*>([^<]*)<\/[^>]*>/
  const match = html.match(regex)
  return isDefined(match) ? match[1] : ""
}

/**
 * 見出し用のIDを生成する関数
 * @param text - ReactNode | string
 * @returns ID
 */
export const generateHeadingId = (text: ReactNode | string): string => {
  const targetText =
    typeof text === "string" ? text : extractTextFromHTMLTag(extractTextFromChildren(text))

  return targetText
    .replace(/^\d/, "") // 先頭が数字の場合は削除
    .replace(/[^A-Za-z0-9\u3040-\u309F\u30A0-\u30FF\u3400-\u4DBF\u4E00-\u9FFFー_-]/g, "") // 英数字と日本語と一部記号以外を削除
    .replace(/\s/g, "") // 空白を削除
}
