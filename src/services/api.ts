/**
 * @file APIにアクセスしデーターを整形する関数群
 */

import { axiosInstance } from "@/services/axios"
import { isDefined } from "@/utils/isDefined"

import type { components, paths } from "@/types/schema"

/**
 * 記事を取得する
 * @param articleId 記事ID (articleUrlIdではないので注意)
 * @returns 記事データ
 */
export const getArticle = async (
  articleId: number
): Promise<components["schemas"]["Article"] | undefined> => {
  const response = await axiosInstance.get<
    paths["/articles/{id}"]["get"]["responses"]["200"]["content"]["application/json"]
  >(`/articles/${articleId}`)
  return response.data.data?.attributes
}

/**
 * articleUrlId一覧を取得する
 * @returns articleUrlId一覧
 */
export const getAllArticleUrlIds = async (): Promise<
  Array<{
    articleId: number
    articleUrlId: string
  }>
> => {
  const response =
    await axiosInstance.get<
      paths["/articles"]["get"]["responses"]["200"]["content"]["application/json"]
    >("/articles")
  const articles = response.data.data

  if (!isDefined(articles)) return []

  return articles
    .map(article => ({
      articleId: article.id ?? 0,
      articleUrlId: article.attributes?.articleUrlId ?? ""
    }))
    .filter(({ articleId, articleUrlId }) => articleId !== 0 && articleUrlId !== "")
}
