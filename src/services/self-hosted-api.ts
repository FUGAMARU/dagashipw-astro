/**
 * @file AstroのAPI Routeを用いて自己ホストしているAPIにアクセスするための関数群
 */

import { selfHostedAxiosInstance } from "@/services/axios"

import type {
  CalculatedArticle,
  PostCommentFromBrowserRequestBody,
  SidebarApiResponse
} from "@/types/api"
import type { CommentInfo } from "@/types/models"
import type { AxiosResponse } from "axios"

/**
 * 自己ホストしているAPIにuseSWRでアクセスする時のfetcher
 *
 * @param option - API関数名と引数
 * @param option.apiFunction - API関数名
 * @param option.arg - API関数の引数
 * @returns レスポンス
 */
export const selfHostedFetcher = <T>(option: {
  /** API関数名 */
  apiFunction:
    | "getArticleCommentCount"
    | "getArticleCommentInfoList"
    | "getSameTagArticles"
    | "getSidebarInfo"
  /** API関数の引数 */
  arg: string
}): Promise<T> => {
  switch (option.apiFunction) {
    case "getArticleCommentCount":
      return getArticleCommentCount(option.arg) as unknown as Promise<T> // TODO: アサーションしないようにしたい
    case "getArticleCommentInfoList":
      return getArticleCommentInfoList(option.arg) as unknown as Promise<T>
    case "getSameTagArticles":
      return getSameTagArticles(option.arg) as unknown as Promise<T>
    case "getSidebarInfo":
      return getSidebarInfo() as unknown as Promise<T>
  }
}

/**
 * サイドバーに表示する情報を取得する
 *
 * @returns サイドバーに表示する情報
 */
export const getSidebarInfo = async (): Promise<SidebarApiResponse> => {
  const response = await selfHostedAxiosInstance.get<SidebarApiResponse>("/sidebar")
  return response.data
}

/**
 * 記事のコメント数を取得する
 *
 * @param articleUrlId - 記事のURL ID
 * @returns コメント数
 */
const getArticleCommentCount = async (articleUrlId: string): Promise<number> => {
  const response = await selfHostedAxiosInstance.get<number>(
    `/proxy/comments/${articleUrlId}/count`
  )
  return response.data
}

/**
 * 記事のコメント一覧を取得する
 *
 * @param articleUrlId - 記事のURL ID
 * @returns コメント一覧
 */
const getArticleCommentInfoList = async (articleUrlId: string): Promise<Array<CommentInfo>> => {
  const response = await selfHostedAxiosInstance.get<Array<CommentInfo>>(
    `/proxy/comments/${articleUrlId}`
  )
  return response.data
}

/**
 * 同じタグが設定されている他の記事の一覧をランダムに取得する
 *
 * @param articleUrlId - 記事のURL ID
 * @returns 同じタグが設定されている他の記事の一覧
 */
const getSameTagArticles = async (articleUrlId: string): Promise<Array<CalculatedArticle>> => {
  const response = await selfHostedAxiosInstance.get<Array<CalculatedArticle>>(
    `/proxy/articles/${articleUrlId}/same-tag`
  )

  return response.data
}

/**
 * コメントを投稿する
 * (SWRからは呼ばないのでfetcherに含めていない)
 *
 * @param articleUrlId - 記事のURL ID
 * @param body - コメント本文
 * @param turnstileToken - Cloudflare Turnstileのトークン
 * @param userName - ユーザー名
 * @param parentCommentDocumentId - 親コメントのドキュメントID
 * @returns void
 */
export const postComment = async (
  articleUrlId: string,
  body: string,
  turnstileToken: string,
  userName?: string,
  parentCommentDocumentId?: string
): Promise<AxiosResponse<string>> =>
  await selfHostedAxiosInstance.post<
    string,
    AxiosResponse<string>,
    PostCommentFromBrowserRequestBody
  >(`/proxy/comments/${articleUrlId}`, {
    body,
    userName,
    parentCommentDocumentId,
    turnstileToken
  })
