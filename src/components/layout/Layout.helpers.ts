import { isValidString } from "@/utils"

import type { ArticleInfo } from "@/types/models"

/**
 * 記事ページ用の構造化データーを作成する
 *
 * @param title - タイトル
 * @param description - 説明
 * @param ogImageUrl - OGP画像URL
 * @param currentUrl - 現在のURL
 * @param articleInfo - 記事情報
 * @returns 記事ページ用の構造化データー
 */
export const createArticleSchema = (
  title: string,
  description: string,
  ogImageUrl: string,
  currentUrl: string,
  articleInfo: ArticleInfo
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: [ogImageUrl],
    url: currentUrl,
    datePublished: new Date(articleInfo.createdAt).toISOString(),
    dateModified: isValidString(articleInfo.updatedAt)
      ? new Date(articleInfo.updatedAt).toISOString()
      : undefined,
    author: {
      "@type": "Person",
      name: "FUGAMARU"
    }
  }
}

/**
 * 記事ページ以外のページの構造化データーを作成する
 *
 * @param siteUrl - サイトのURL
 * @returns ページ用の構造化データー
 */
export const createDefaultSchema = (
  siteUrl: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "麩菓子の雑記帳",
    url: siteUrl,
    potentialAction: [
      {
        "@type": "SearchAction",
        target: `${siteUrl}/search?keyword={search_term_string}`,
        "query-input": "required name=search_term_string",
        description: "キーワードで記事を検索"
      },
      {
        "@type": "SearchAction",
        target: `${siteUrl}/search?tag={search_term_string}`,
        "query-input": "required name=search_term_string",
        description: "タグ名で記事を検索"
      }
    ]
  }
}
