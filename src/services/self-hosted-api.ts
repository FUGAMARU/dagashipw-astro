/**
 * @file AstroのAPI Routeを用いて自己ホストしているAPIにアクセスするための関数群
 */

import { selfHostedAxiosInstance } from "@/services/axios"

import type { CommentInfo } from "@/types/models"

/**
 * 自己ホストしているAPIにuseSWRでアクセスする時のfetcher
 *
 * @param url - URL
 * @returns レスポンス
 */
export const selfHostedFetcher = <T>(url: string): Promise<T> =>
  selfHostedAxiosInstance.get<T>(url).then(res => res.data)

/**
 * IPv4回線を使用しているどうかをチェックする
 *
 * @returns IPv4回線を使用しているかどうか
 */
export const checkIsIPv4 = async (): Promise<boolean> => {
  const response = await selfHostedAxiosInstance.get<boolean>("/is-ip-v4")
  return response.data
}

/**
 * 指定した記事のコメント一覧を取得する
 *
 * @param articleUrlId - 記事のURL ID
 * @returns コメント一覧
 */
export const getComments = async (articleUrlId: string): Promise<Array<CommentInfo>> => {
  const response = await selfHostedAxiosInstance.get<Array<CommentInfo>>(
    `/proxy/comments/${articleUrlId}`
  )
  return response.data
}
