/**
 * @file リンク関連の関数群
 */

import { LinkInArticle } from "@/components/article/standards/LinkInArticle"
import { isValidString } from "@/utils"
import { unescapeNewlines } from "@/utils/formatter"

import type { ReactNode } from "react"

/**
 * bodyをパースしてMarkdownのリンク記法のstringがあれば実際にLinkInArticleコンポーネントに置き換える
 *
 * @param text - マークダウン文字列
 * @returns リンクがLinkInArticleコンポーネントに置き換えられたJSXの配列
 */
export const parseMarkdownLinks = (text: string): Array<ReactNode> => {
  const normalizedText = unescapeNewlines(text)
  const regex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]+)\)/g

  return normalizedText
    .split(regex)
    .reduce<
      Array<string | ReactNode>
    >((acc: Array<string | ReactNode>, part: string, index: number, arr: Array<string>) => {
      // テキスト部分の場合（リンク記法の外側の通常テキスト）
      if (index % 3 === 0) {
        acc.push(part)
        return acc
      }

      // リンクテキスト部分の場合（[テキスト](URL) のテキスト部分）
      if (index % 3 === 1) {
        acc.push(
          <LinkInArticle key={index} href={arr[index + 1]}>
            {part}
          </LinkInArticle>
        )
        return acc
      }

      // それ以外の場合はリンクURL部分なので何もしない
      return acc
    }, [])
}

/**
 * プレーンテキスト内のURL文字列を検出してLinkInArticleコンポーネントでラップする
 *
 * @param text - プレーンテキスト
 * @returns URLがLinkInArticleコンポーネントに置き換えられたJSXの配列
 */
export const parsePlainTextUrls = (text: string): Array<ReactNode> => {
  if (!isValidString(text)) {
    return []
  }

  const urlRegex = /(https?:\/\/[^\s]+)/g

  return text.split(urlRegex).map((part, index) => {
    if (urlRegex.test(part)) {
      return (
        <LinkInArticle key={index} href={part}>
          {part}
        </LinkInArticle>
      )
    }

    return part
  })
}
