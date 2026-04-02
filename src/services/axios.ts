/**
 * @file Axiosの設定ファイル
 */

import axios from "axios"

import { API_ORIGIN, API_TOKEN } from "@/constants/env"
import { isServerSide, isValidString } from "@/utils"

/** API接続する時に使用するAxiosのインスタンス */
export const axiosInstance = axios.create({
  baseURL: `${API_ORIGIN}`,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`
  }
})

/** 自己ホストしているAPIに接続する時に使用するAxiosのインスタンス */
export const selfHostedAxiosInstance = axios.create({
  baseURL: import.meta.env.STORYBOOK === "true" ? "http://localhost:4321/api" : "/api"
})

/** リクエストインターセプター */
axiosInstance.interceptors.request.use(
  config => {
    // リクエストが送信される前の処理

    // リクエストログの出力
    if (isServerSide) {
      /**
       * フルURLを構築するヘルパー関数
       *
       * @param baseURL - baseURL
       * @param url - URL
       * @returns フルURL
       */
      const buildFullUrl = (baseURL: string | undefined, url: string | undefined): string => {
        if (!isValidString(baseURL) || !isValidString(url)) {
          return url ?? ""
        }

        const normalizedBaseUrl = baseURL.endsWith("/") ? baseURL : `${baseURL}/`
        const normalizedUrl = url.startsWith("/") ? url.slice(1) : url

        return new URL(normalizedUrl, normalizedBaseUrl).href
      }

      console.log(
        `[AstroRequest - ${config.method?.toUpperCase()}] ${buildFullUrl(config.baseURL, config.url)}`
      )
    }

    return config
  },
  error => {
    // リクエスト エラーの処理
    return Promise.reject(error)
  }
)

/** レスポンスインターセプター */
axiosInstance.interceptors.response.use(
  response => {
    // ステータスコードが 2xx の範囲にある場合、この関数が起動します
    // リクエスト データの処理
    return response
  },
  error => {
    // ステータスコードが 2xx の範囲外の場合、この関数が起動します
    // リクエスト エラーの処理
    // TODO: ここでエラーモーダルなどを出すと良さそう？ (https://zenn.dev/nbr41to/articles/c7fc2ff1f9946e)
    return Promise.reject(error)
  }
)
