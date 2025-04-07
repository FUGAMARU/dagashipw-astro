/**
 * @file APIにアクセスしデーターを整形する関数群
 */

import axios from "axios"

import { axiosInstance } from "@/services/axios"
import { isDefined } from "@/utils"

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
  return response.data.data?.[0]
}

/**
 * articleUrlId一覧を取得する
 *
 * @returns articleUrlId一覧
 */
export const getAllArticleUrlIds = async (): Promise<Array<string>> => {
  let currentPage = 1
  let totalArticleCount = 0
  let loadedPageCount = 0
  const articleUrlIds: Array<string> = []

  do {
    const response = await axiosInstance.get<
      paths["/articles"]["get"]["responses"]["200"]["content"]["application/json"]
    >(`/articles?pagination[page]=${currentPage}&pagination[withCount]=true`)

    const totalArticleCountResponse = response.data.meta?.pagination?.total
    const itemCountPerPageResponse = response.data.meta?.pagination?.pageSize

    if (!isDefined(totalArticleCountResponse) || !isDefined(itemCountPerPageResponse)) {
      break
    }

    totalArticleCount = totalArticleCountResponse

    response.data.data?.forEach(article => {
      const articleUrlId = article.articleUrlId

      if (isDefined(articleUrlId)) {
        articleUrlIds.push(articleUrlId)
      }
    })

    loadedPageCount += itemCountPerPageResponse
    currentPage++
  } while (loadedPageCount < totalArticleCount)

  return articleUrlIds
}

/**
 * ページネーションありで指定したページの記事を取得する
 *
 * @param pageNumber - ページ番号
 * @returns 記事一覧
 */
export const getArticlesWithPagination = async (
  pageNumber: number
): Promise<Array<components["schemas"]["Article"] | undefined> | undefined> => {
  const response = await axiosInstance.get<
    paths["/articles"]["get"]["responses"]["200"]["content"]["application/json"]
  >(
    `/articles?pagination[page]=${pageNumber}&pagination[pageSize]=${ARTICLES_PER_PAGE}&pagination[withCount]=true&sort[0]=id:desc&populate=*`
  )
  return response.data.data
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

/**
 * 記事一覧をページネーション付きで表示する場合に全部で何ページあるのか取得する
 *
 * @returns 記事一覧の合計ページ数
 */
export const getTotalArticlePageCount = async (): Promise<number> => {
  const response = await axiosInstance.get<
    paths["/articles"]["get"]["responses"]["200"]["content"]["application/json"]
  >(`/articles?pagination[pageSize]=${ARTICLES_PER_PAGE}`)
  return response.data?.meta?.pagination?.pageCount ?? 0
}
