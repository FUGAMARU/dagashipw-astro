/**
 * @file APIにアクセスしデーターを整形する関数群
 */

import { ARTICLES_PER_PAGE, MAX_ARTICLE_CARD_MINI_LIST_DISPLAY_COUNT } from "@/constants/value"
import { axiosInstance } from "@/services/axios"
import { isDefined } from "@/utils"

import type {
  Article,
  ArticlesPathResponse,
  Comment,
  CommentsPathResponse,
  PaginatedResponse,
  FieldPickedArticlePathResponse,
  PostCommentRequestBody,
  PostCommentResponse
} from "@/types/api"
import type { AxiosResponse } from "axios"

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
    `${endpoint}&pagination[page]=1&pagination[pageSize]=${dataCountPerRequest}&pagination[withCount]=true`
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
        >(`${endpoint}&pagination[page]=${page}&pagination[pageSize]=${dataCountPerRequest}&pagination[withCount]=false`)
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
export const getArticle = async (articleUrlId: string): Promise<Article> => {
  const response = await axiosInstance.get<ArticlesPathResponse>(
    `/articles?filters[articleUrlId][$eq]=${articleUrlId}&populate=*`
  )

  const article = response.data.data?.[0]

  if (!isDefined(article)) {
    throw new Error("記事情報が存在しません")
  }

  return article
}

/**
 * articleUrlId一覧を取得する
 *
 * @returns articleUrlId一覧
 */
export const getAllArticleUrlIdList = async (): Promise<Array<string>> => {
  const articles = await fetchAllPaginated<FieldPickedArticlePathResponse<"articleUrlId">>(
    "/articles?fields=articleUrlId"
  )

  return articles.map(article => article.articleUrlId)
}

/**
 * ページネーションありで指定したページの記事を取得する
 *
 * @param pageNumber - ページ番号
 * @returns 記事一覧
 */
export const getArticlesWithPagination = async (pageNumber: number): Promise<Array<Article>> => {
  const response = await axiosInstance.get<ArticlesPathResponse>(
    `/articles?pagination[page]=${pageNumber}&pagination[pageSize]=${ARTICLES_PER_PAGE}&pagination[withCount]=true&sort[0]=forceCreatedAt:desc&sort[1]=createdAt:desc&populate=*`
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
  const response = await axiosInstance.get<ArticlesPathResponse>(
    `/articles?pagination[pageSize]=${ARTICLES_PER_PAGE}`
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
  const response = await axiosInstance.get<ArticlesPathResponse>(
    `/articles?filters[title][$containsi]=${keyword}&filters[body][$containsi]=${keyword}&pagination[pageSize]=${ARTICLES_PER_PAGE}`
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
  const response = await axiosInstance.get<ArticlesPathResponse>(
    `/articles?filters[tags][_contains]=${tag}&pagination[pageSize]=${ARTICLES_PER_PAGE}`
  )
  return response.data?.meta?.pagination?.pageCount ?? 0
}

/**
 * 指定した記事に寄せられているコメント一覧を取得する
 *
 * @param articleUrlId - 記事のURL ID
 * @returns コメント一覧
 */
export const getComments = async (articleUrlId: string): Promise<Array<Comment>> =>
  fetchAllPaginated<Comment>(`/comments?filters[articleUrlId][$eq]=${articleUrlId}`)

/**
 * 指定した記事に寄せられているコメント数を取得する
 *
 * @param articleUrlId - 記事のURL ID
 * @returns コメント数
 */
export const getCommentCount = async (articleUrlId: string): Promise<number> => {
  const response = await axiosInstance.get<CommentsPathResponse>(
    `/comments?filters[articleUrlId][$eq]=${articleUrlId}&pagination[withCount]=true`
  )
  return response.data.meta?.pagination?.total ?? 0
}

/**
 * 全ての記事に対して記事ごとに指定されているタグの一覧を取得する
 *
 *  @returns 記事URL IDとタグの一覧
 */
export const getArticleTagsForAllArticles = async (): Promise<
  Array<{
    /** 記事URL ID */
    articleUrlId: string
    /** タグ一覧 */
    tags: Array<string>
  }>
> => {
  const articles = await fetchAllPaginated<FieldPickedArticlePathResponse<"articleUrlId" | "tags">>(
    "/articles?fields[0]=articleUrlId&fields[1]=tags"
  )

  return articles.map(article => ({
    articleUrlId: article.articleUrlId,
    tags: (article.tags as Array<string>).map(tag => tag)
  }))
}

/**
 * 最新の記事n件を取得する (nは定数にて定義 / 更新日は判定基準に含めない)
 *
 * @returns 最新記事4件
 */
export const getRecentArticles = async (): Promise<Array<Article>> => {
  const response = await axiosInstance.get<ArticlesPathResponse>(
    `/articles?pagination[page]=1&pagination[pageSize]=${MAX_ARTICLE_CARD_MINI_LIST_DISPLAY_COUNT}&sort[0]=forceCreatedAt:desc&sort[1]=createdAt:desc&populate=*`
  )
  return response.data.data ?? []
}

/**
 * コメントを投稿する
 *
 * @param articleUrlId - 記事のURL ID
 * @param body - コメント本文
 * @param userName - ユーザー名
 * @param parentCommentDocumentId - 親コメントのドキュメントID
 * @returns 投稿されたコメントのdocumentId
 */
export const postComment = async (
  articleUrlId: string,
  body: string,
  userName?: string,
  parentCommentDocumentId?: string
): Promise<string> => {
  const now = new Date()
  now.setHours(now.getHours() - 9) // DBでは日時データーをUTCで保持したいが、toISOString()したStringをPOSTしてもStrapiが勝手にJSTに変換するという鬼畜仕様のためさらに-9時間した日時をforceCreatedAtとしてPOSTする (createdAtも同様に勝手にJSTが入るので使用しない)
  const forceCreatedAt = now.toISOString()

  const { data } = await axiosInstance.post<
    PostCommentResponse,
    AxiosResponse<PostCommentResponse>,
    PostCommentRequestBody
  >("/comments", {
    data: {
      articleUrlId,
      body,
      userName,
      parentCommentDocumentId,
      isAdministratorComment: false, // 管理者コメントは今のところCMSからのみ投稿する想定なので固定でfalse指定
      forceCreatedAt
    }
  })

  return data?.data?.documentId ?? ""
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
): Promise<Array<Article>> => {
  const response = await axiosInstance.get<ArticlesPathResponse>(
    `/articles?filters[title][$containsi]=${keyword}&filters[body][$containsi]=${keyword}&pagination[page]=${pageNumber}&pagination[pageSize]=${ARTICLES_PER_PAGE}&pagination[withCount]=true&sort[0]=forceCreatedAt:desc&sort[1]=createdAt:desc&populate=*`
  )

  if (!isDefined(response.data.data)) {
    throw new Error("ページ情報が存在しません")
  }

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
): Promise<Array<Article>> => {
  const response = await axiosInstance.get<ArticlesPathResponse>(
    `/articles?filters[tags][$contains]=${tag}&pagination[page]=${pageNumber}&pagination[pageSize]=${ARTICLES_PER_PAGE}&pagination[withCount]=true&sort[0]=forceCreatedAt:desc&sort[1]=createdAt:desc&populate=*`
  )

  if (!isDefined(response.data.data)) {
    throw new Error("ページ情報が存在しません")
  }

  return response.data.data
}
