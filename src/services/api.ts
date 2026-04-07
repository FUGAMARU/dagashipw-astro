/**
 * @file APIにアクセスしデーターを整形する関数群
 */

import { ARTICLES_PER_PAGE, MAX_ARTICLE_CARD_MINI_LIST_DISPLAY_COUNT } from "@/constants/value"
import { axiosInstance } from "@/services/axios"
import { isDefined } from "@/utils"

import type {
  CommentsItemsResponse,
  PostCommentRequestBody,
  PostCommentResponse,
  CalculatedArticleResponse,
  CalculatedArticle,
  CalculatedComment,
  CalculatedCommentResponse
} from "@/types/api"
import type { AxiosResponse } from "axios"

/**
 * 記事を取得する
 *
 * @param articleUrlId - 記事のURL ID
 * @returns 記事データ
 */
export const getArticle = async (articleUrlId: string): Promise<CalculatedArticle> => {
  const response = await axiosInstance.get<CalculatedArticle>(
    `/calculated-api/articles/${articleUrlId}`
  )

  return response.data
}

/**
 * articleUrlId一覧を取得する
 *
 * @returns articleUrlId一覧
 */
export const getAllArticleUrlIdList = async (): Promise<Array<string>> => {
  const articles = await axiosInstance.get<Array<string>>(
    "/calculated-api/articles/all-article-url-id"
  )

  return articles.data
}

/**
 * ページネーションありで指定したページの記事を取得する
 *
 * @param pageNumber - ページ番号
 * @returns 記事一覧
 */
export const getArticlesWithPagination = async (
  pageNumber: number
): Promise<Array<CalculatedArticle>> => {
  const response = await axiosInstance.get<CalculatedArticleResponse>(
    `/calculated-api/articles?pagination[page]=${pageNumber}&pagination[pageSize]=${ARTICLES_PER_PAGE}`
  )

  if (!isDefined(response.data.data)) {
    throw new Error("ページ情報が存在しません")
  }

  return response.data.data
}

/**
 * 記事一覧をページネーション付きで表示する場合に全部で何ページあるのか取得する
 *
 * @returns 記事一覧の合計ページ数
 */
export const getTotalArticlePageCount = async (): Promise<number> => {
  const response = await axiosInstance.get<CalculatedArticleResponse>(
    `/calculated-api/articles?pagination[pageSize]=${ARTICLES_PER_PAGE}`
  )
  return response.data?.meta?.pagination?.pageCount ?? 0
}

/**
 * キーワードで絞り込んだ状態の記事一覧をページネーション付きで表示する場合に全部で何ページあるのか取得する
 *
 * @param keyword - 検索キーワード
 * @returns キーワードで絞り込んだ状態の記事一覧の合計ページ数
 */
export const getTotalArticlePageCountByKeyword = async (keyword: string): Promise<number> => {
  const response = await axiosInstance.get<CalculatedArticleResponse>(
    `/calculated-api/articles/search/keyword?keyword=${encodeURIComponent(keyword)}&pagination[pageSize]=${ARTICLES_PER_PAGE}`
  )
  return response.data?.meta?.pagination?.pageCount ?? 0
}

/**
 * タグで絞り込んだ状態の記事一覧をページネーション付きで表示する場合に全部で何ページあるのか取得する
 *
 * @param tag - タグ
 * @returns タグで絞り込んだ状態の記事一覧の合計ページ数
 */
export const getTotalArticlePageCountByTag = async (tag: string): Promise<number> => {
  const response = await axiosInstance.get<CalculatedArticleResponse>(
    `/calculated-api/articles/search/tag?tag=${encodeURIComponent(tag)}&pagination[pageSize]=${ARTICLES_PER_PAGE}`
  )
  return response.data?.meta?.pagination?.pageCount ?? 0
}

/**
 * 指定した記事に寄せられているコメント一覧を取得する
 *
 * @param articleUrlId - 記事のURL ID
 * @returns コメント一覧
 */
export const getComments = async (articleUrlId: string): Promise<Array<CalculatedComment>> => {
  const response = await axiosInstance.get<CalculatedCommentResponse>(
    `/calculated-api/comments/${articleUrlId}`
  )
  return response.data.data
}

/**
 * 指定した記事に寄せられているコメント数を取得する
 *
 * @param articleUrlId - 記事のURL ID
 * @returns コメント数
 */
export const getCommentCount = async (articleUrlId: string): Promise<number> => {
  const response = await axiosInstance.get<CommentsItemsResponse>(
    `/items/comments?filter[article_url_id][_eq]=${articleUrlId}&limit=0&meta=filter_count`
  )
  return response.data.meta?.filter_count ?? 0
}

/**
 * 指定した記事の関連記事を取得する
 *
 * @param articleUrlId - 記事のURL ID
 * @returns 関連記事一覧
 */
export const getSameTagArticles = async (
  articleUrlId: string
): Promise<Array<CalculatedArticle>> => {
  const response = await axiosInstance.get<CalculatedArticleResponse>(
    `/calculated-api/articles/${articleUrlId}/related?limit=${MAX_ARTICLE_CARD_MINI_LIST_DISPLAY_COUNT}`
  )
  return response.data.data
}

/**
 * 最新の記事n件を取得する (nは定数にて定義 / 更新日は判定基準に含めない)
 *
 * @returns 最新記事4件
 */
export const getRecentArticles = async (): Promise<Array<CalculatedArticle>> => {
  const response = await axiosInstance.get<CalculatedArticleResponse>(
    `/calculated-api/articles?pagination[page]=1&pagination[pageSize]=${MAX_ARTICLE_CARD_MINI_LIST_DISPLAY_COUNT}`
  )
  return response.data.data ?? []
}

/**
 * コメントを投稿する
 *
 * @param articleUrlId - 記事のURL ID
 * @param body - コメント本文
 * @param userName - ユーザー名
 * @param parentCommentId - 親コメントのID
 * @returns 投稿されたコメントのcomment_id
 */
export const postComment = async (
  articleUrlId: string,
  body: string,
  userName?: string,
  parentCommentId?: string
): Promise<string> => {
  const forceCreatedAt = new Date().toISOString()

  const { data } = await axiosInstance.post<
    PostCommentResponse,
    AxiosResponse<PostCommentResponse>,
    PostCommentRequestBody
  >("/items/comments", {
    article_url_id: articleUrlId,
    body,
    user_name: userName,
    parent_comment_id: parentCommentId,
    is_administrator_comment: false, // 管理者コメントは今のところCMSからのみ投稿する想定なので固定でfalse指定
    force_created_at: forceCreatedAt
  })

  return data?.data?.comment_id ?? ""
}

/**
 * 記事をページネーション付きでキーワード検索する
 *
 * @param keyword - 検索キーワード
 * @param pageNumber - ページ番号
 * @returns 検索結果の記事一覧
 */
export const searchArticlesByKeywordWithPagination = async (
  keyword: string,
  pageNumber: number
): Promise<Array<CalculatedArticle>> => {
  const response = await axiosInstance.get<CalculatedArticleResponse>(
    `/calculated-api/articles/search/keyword?keyword=${encodeURIComponent(keyword)}&pagination[page]=${pageNumber}&pagination[pageSize]=${ARTICLES_PER_PAGE}`
  )
  return response.data.data
}

/**
 * 記事をページネーション付きでタグで絞り込んで検索する
 *
 * @param tag - タグ
 * @param pageNumber - ページ番号
 * @returns タグで絞り込んだ状態の記事一覧
 */
export const searchArticlesByTagWithPagination = async (
  tag: string,
  pageNumber: number
): Promise<Array<CalculatedArticle>> => {
  const response = await axiosInstance.get<CalculatedArticleResponse>(
    `/calculated-api/articles/search/tag?tag=${encodeURIComponent(tag)}&pagination[page]=${pageNumber}&pagination[pageSize]=${ARTICLES_PER_PAGE}`
  )
  return response.data.data
}
