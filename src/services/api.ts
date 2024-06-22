/**
 * @file APIにアクセスしデーターを整形する関数群
 */

import { axiosInstance } from "@/services/axios"
import { isDefined } from "@/utils/isDefined"

import type { components, paths } from "@/types/schema"

/**
 * 記事を取得する
 * @param articleUrlId 記事のURL ID
 * @returns 記事データ
 */
export const getArticle = async (
  articleUrlId: string
): Promise<components["schemas"]["Article"] | undefined> => {
  const response = await axiosInstance.get<
    paths["/articles"]["get"]["responses"]["200"]["content"]["application/json"]
  >(`/articles?filters[articleUrlId][$eq]=${articleUrlId}&populate=*`)
  return response.data?.data?.[0]?.attributes
}

/**
 * articleUrlId一覧を取得する
 * @returns articleUrlId一覧
 */
export const getAllArticleUrlIds = async (): Promise<Array<string>> => {
  const response =
    await axiosInstance.get<
      paths["/articles"]["get"]["responses"]["200"]["content"]["application/json"]
    >("/articles")
  const articles = response.data.data

  if (!isDefined(articles)) return []

  return articles.map(article => article.attributes?.articleUrlId).filter(isDefined)
}
