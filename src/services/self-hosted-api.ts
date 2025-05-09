/**
 * @file AstroのAPI Routeを用いて自己ホストしているAPIにアクセスするための関数群
 */

import { selfHostedAxiosInstance } from "@/services/axios"

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
 * TODO: SWRで叩くようにしたほうが良いかも
 *
 * @returns IPv4回線を使用しているかどうか
 */
export const checkIsIPv4 = async (): Promise<boolean> => {
  const response = await selfHostedAxiosInstance.get<boolean>("/is-ip-v4")
  return response.data
}
