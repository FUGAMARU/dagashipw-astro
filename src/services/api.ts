/**
 * @file APIにアクセスしデーターを整形する関数群
 */

import { axiosInstance } from "@/services/axios"

import type { Article } from "@/types/api/Article"

/**
 * 記事を取得する
 * @param articleId 記事ID (articleUrlIdではないので注意)
 * @returns 記事データ
 */
export const getArticle = async (articleId: number): Promise<Article["data"]> => {
  const response = await axiosInstance.get(`/articles/${articleId}`)
  return response.data
}
