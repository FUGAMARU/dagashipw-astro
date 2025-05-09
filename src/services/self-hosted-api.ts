/**
 * @file AstroのAPI Routeを用いて自己ホストしているAPIにアクセスするための関数群
 */

import { selfHostedAxiosInstance } from "@/services/axios"

import type { ArticleInfo, CommentInfo } from "@/types/models"

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
    | "getSignedImageUrl"
    | "getSameTagArticles"
  /** API関数の引数 */
  arg: string
}): Promise<T> => {
  switch (option.apiFunction) {
    case "getArticleCommentCount":
      return getArticleCommentCount(option.arg) as unknown as Promise<T> // TODO: アサーションしないようにしたい
    case "getArticleCommentInfoList":
      return getArticleCommentInfoList(option.arg) as unknown as Promise<T>
    case "getSignedImageUrl":
      return getSignedImageUrl(option.arg) as unknown as Promise<T>
    case "getSameTagArticles":
      return getSameTagArticles(option.arg) as unknown as Promise<T>
  }
}

/**
 * IPv4回線を使用しているどうかをチェックする
 * TODO: SWRで叩くようにしたほうが良いかも
 *
 * @returns IPv4回線を使用しているかどうか
 */
export const checkIsIPv4 = async (): Promise<boolean> => {
  const response = await selfHostedAxiosInstance.get<boolean>("/is-ip-v4")
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
 * 画像の署名付きURLを取得する
 *
 * @param src - 画像のURL
 * @returns 署名付きURL
 */
const getSignedImageUrl = async (src: string): Promise<string> => {
  const response = await selfHostedAxiosInstance.get<string>(`signed-image-url?src=${src}`)
  return response.data
}

/**
 * 同じタグが設定されている他の記事の一覧をランダムに取得する
 *
 * @param articleUrlId - 記事のURL ID
 * @returns 同じタグが設定されている他の記事の一覧
 */
const getSameTagArticles = async (articleUrlId: string): Promise<Array<ArticleInfo>> => {
  const response = await selfHostedAxiosInstance.get<Array<ArticleInfo>>(
    `/proxy/articles/${articleUrlId}/same-tag`
  )
  return response.data
}
