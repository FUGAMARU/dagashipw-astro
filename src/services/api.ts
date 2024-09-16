/**
 * @file APIにアクセスしデーターを整形する関数群
 */

import axios from "axios"

import { axiosInstance } from "@/services/axios"
import { isDefined } from "@/utils/isDefined"

import type { components, paths } from "@/types/schema"

/** 1ページあたりの記事表示数 */
const ARTICLES_PER_PAGE = 10

/**
 * 記事を取得する
 *
 * @param articleUrlId - 記事のURL ID
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
 *
 * @returns articleUrlId一覧
 */
export const getAllArticleUrlIds = async (): Promise<Array<string>> => {
  const response =
    await axiosInstance.get<
      paths["/articles"]["get"]["responses"]["200"]["content"]["application/json"]
    >("/articles")
  const articles = response.data.data

  if (!isDefined(articles)) {
    return []
  }

  return articles.map(article => article.attributes?.articleUrlId).filter(isDefined)
}

/**
 * 記事一覧を取得する (ページネーションあり)
 *
 * @param pageNumber - ページ番号
 * @returns 記事一覧
 */
export const getAllArticlesWithPagination = async (
  pageNumber: number
): Promise<Array<components["schemas"]["Article"] | undefined> | undefined> => {
  const response = await axiosInstance.get<
    paths["/articles"]["get"]["responses"]["200"]["content"]["application/json"]
  >(
    `/articles?pagination[page]=${pageNumber}&pagination[pageSize]=${ARTICLES_PER_PAGE}&pagination[withCount]=true&sort[0]=id:desc&populate=*`
  )
  return response.data?.data?.map(article => article.attributes)
}

/**
 * IPv4回線を使用しているどうかをチェックする
 *
 * @returns IPv4回線を使用しているかどうか
 */
export const checkIsIPv4 = async (): Promise<boolean> => {
  const response = await axios.get<boolean>("/api/is-ip-v4")
  return response.data
}
