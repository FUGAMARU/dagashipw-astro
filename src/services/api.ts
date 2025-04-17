/**
 * @file APIにアクセスしデーターを整形する関数群
 */

import axios from "axios"

import { ARTICLES_PER_PAGE } from "@/constants/value"
import { axiosInstance } from "@/services/axios"
import { isDefined } from "@/utils"

import type { Article, Comment } from "@/types/models"
import type { components, paths } from "@/types/schema"

/** ページネーション付きAPIレスポンス (どのコレクションでも同一のIFなので代表してArticleの型定義を引用している) */
type PaginatedResponse<T> = components["schemas"]["ArticleListResponse"] & {
  /** データー */
  data?: Array<T>
}

/**
 * ページネーションありで指定したエンドポイントのデータを全て取得する
 *
 * @param endpoint - エンドポイント
 * @returns データ一覧
 */
export const fetchAllPaginated = async <T>(endpoint: string): Promise<Array<T>> => {
  /** 1回のリクエストで取得するデーター件数 */
  const dataCountPerRequest = 100

  const firstResponse = await axiosInstance.get<PaginatedResponse<T>>(
    `${endpoint}?pagination[page]=1&pagination[pageSize]=${dataCountPerRequest}&pagination[withCount]=true`
  )

  const firstData = firstResponse.data.data ?? []
  const total = firstResponse.data.meta?.pagination?.total ?? 0
  const perPage = firstResponse.data.meta?.pagination?.pageSize ?? dataCountPerRequest
  const totalPages = Math.ceil(total / perPage)

  if (totalPages <= 1) {
    return firstData
  }

  const restPages = await Promise.all(
    Array.from({ length: totalPages - 1 }, (_, i) => i + 2).map(page =>
      axiosInstance
        .get<
          PaginatedResponse<T>
        >(`${endpoint}pagination[page]=${page}&pagination[pageSize]=${dataCountPerRequest}&pagination[withCount]=false`)
        .then(res => res.data.data ?? [])
    )
  )

  return [...firstData, ...restPages.flat()]
}

/**
 * 記事を取得する
 *
 * @param articleUrlId - 記事のURL ID
 * @returns 記事データ
 */
export const getArticle = async (articleUrlId: string): Promise<Article | undefined> => {
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
export const getAllArticleUrlIdList = async (): Promise<Array<string>> => {
  const articles = await fetchAllPaginated<Article>("/articles")

  return articles.map(article => article.articleUrlId).filter(isDefined)
}

/**
 * ページネーションありで指定したページの記事を取得する
 *
 * @param pageNumber - ページ番号
 * @returns 記事一覧
 */
export const getArticlesWithPagination = async (
  pageNumber: number
): Promise<Array<Article | undefined> | undefined> => {
  const response = await axiosInstance.get<
    paths["/articles"]["get"]["responses"]["200"]["content"]["application/json"]
  >(
    `/articles?pagination[page]=${pageNumber}&pagination[pageSize]=${ARTICLES_PER_PAGE}&pagination[withCount]=true&sort[0]=forceCreatedAt:desc&sort[1]=createdAt:desc&populate=*`
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

/**
 * 指定した記事に寄せられているコメント一覧を取得する
 *
 * @param articleUrlId - 記事のURL ID
 * @returns コメント一覧
 */
export const getComments = async (articleUrlId: string): Promise<Array<Comment>> =>
  fetchAllPaginated<Comment>(`/comments?filters[articleUrlId][$eq]=${articleUrlId}&`)

/**
 * 指定した記事に寄せられているコメント数を取得する
 *
 * @param articleUrlId - 記事のURL ID
 * @returns コメント数
 */
export const getCommentCount = async (articleUrlId: string): Promise<number> => {
  const response = await axiosInstance.get<
    paths["/comments"]["get"]["responses"]["200"]["content"]["application/json"]
  >(`/comments?filters[articleUrlId][$eq]=${articleUrlId}&pagination[withCount]=true`)
  return response.data.meta?.pagination?.total ?? 0
}
