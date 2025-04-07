/**
 * @file src配下の共通関数をscripts配下でimportするとトランスパイルの際にうまくインポートできずにエラーになるのでJS用に引っ張ってきた物たち
 */

import axios from "axios"
import * as dotenv from "dotenv"
dotenv.config({ path: ".env.local" })

/** APIオリジン */
export const API_ORIGIN = process.env.API_ORIGIN
/** APIトークン */
const API_TOKEN = process.env.API_TOKEN

/**
 * 存在チェック用関数
 *
 * @param value - チェック対象の値
 * @returns チェック結果
 */
export const isDefined = value => value !== undefined && value !== null

if ([API_ORIGIN, API_TOKEN].some(value => !isDefined(value))) {
  const missingEnvironmentVariables = [
    !isDefined(API_ORIGIN) && "API_ORIGINが環境変数に設定されていません",
    !isDefined(API_TOKEN) && "API_TOKENが環境変数に設定されていません"
  ]
    .filter(isDefined)
    .join("\n")

  throw new Error(missingEnvironmentVariables)
}

/** API接続する時に使用するAxiosのインスタンス */
export const axiosInstance = axios.create({
  baseURL: `${API_ORIGIN}/api`,
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
  return response.data.data?.[0]
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
      const articleUrlId = article.articleUrlId

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

  const articleId = data.data.data?.[0].documentId

  if (!isDefined(articleId)) {
    return
  }

  axiosInstance.put(`/articles/${articleId}`, {
    data: {
      themeColor
    }
  })
}

/** 全ての記事の本文を取得する */
export const getAllArticlesBody = async () => {
  const allArticleUrlIdList = await getAllArticleUrlIds()
  const articles = await Promise.all(allArticleUrlIdList.map(getArticle))
  return articles.map(article => ({
    title: article.title,
    body: article.body
  }))
}
