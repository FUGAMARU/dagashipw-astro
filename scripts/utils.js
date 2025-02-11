/**
 * @file src配下の共通関数をscripts配下でimportするとトランスパイルの際にうまくインポートできずにエラーになるのでJS用に引っ張ってきた物たち
 */

import axios from "axios"
import * as dotenv from "dotenv"
dotenv.config({ path: ".env.local" })

/** APIのベースURL */
export const STRAPI_BASE_URL = "https://strapi.dagashi.pw"
const API_TOKEN = process.env.API_TOKEN

/**
 * 存在チェック用関数
 *
 * @param value - チェック対象の値
 * @returns チェック結果
 */
export const isDefined = value => value !== undefined && value !== null

if (!isDefined(API_TOKEN)) {
  throw new Error("APIトークンが環境変数に設定されていません")
}

/** API接続する時に使用するAxiosのインスタンス */
export const axiosInstance = axios.create({
  baseURL: `${STRAPI_BASE_URL}/api`,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`
  }
})

/**
 * 記事を取得する
 *
 * @param articleUrlId - 記事のURL ID
 * @returns 記事データ
 */
export const getArticle = async articleUrlId => {
  const response = await axiosInstance.get(
    `/articles?filters[articleUrlId][$eq]=${articleUrlId}&populate=*`
  )
  return response.data.data?.[0].attributes
}

/**
 * articleUrlId一覧を取得する
 *
 * @returns articleUrlId一覧
 */
export const getAllArticleUrlIds = async () => {
  let currentPage = 1
  let totalArticleCount = 0
  let loadedPageCount = 0
  const articleUrlIds = []

  do {
    const response = await axiosInstance.get(
      `/articles?pagination[page]=${currentPage}&pagination[withCount]=true`
    )

    const totalArticleCountResponse = response.data.meta?.pagination?.total
    const itemCountPerPageResponse = response.data.meta?.pagination?.pageSize

    if (!isDefined(totalArticleCountResponse) || !isDefined(itemCountPerPageResponse)) {
      break
    }

    totalArticleCount = totalArticleCountResponse

    response.data.data?.forEach(article => {
      const articleUrlId = article.attributes?.articleUrlId

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
 * 記事のテーマカラーを設定する
 *
 * @param articleUrlId - 記事のURL ID
 * @param themeColor - テーマカラー(Hex)
 */
export const setArticleThemeColor = async (articleUrlId, themeColor) => {
  const data = await axiosInstance.get(`/articles?filters[articleUrlId][$eq]=${articleUrlId}`)

  const articleId = data.data.data?.[0].id

  if (!isDefined(articleId)) {
    return
  }

  axiosInstance.put(`/articles/${articleId}`, {
    data: {
      themeColor
    }
  })
}
