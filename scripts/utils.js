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
const axiosInstance = axios.create({
  baseURL: `${API_ORIGIN}`,
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
    `/calculated-api/articles/${encodeURIComponent(articleUrlId)}`
  )
  return response.data
}

/**
 * articleUrlId一覧を取得する
 *
 * @returns articleUrlId一覧
 */
export const getAllArticleUrlIdList = async () => {
  const response = await axiosInstance.get("/calculated-api/articles/all-article-url-id")
  return response.data
}

/**
 * 記事のテーマカラーを設定する
 *
 * @param articleUrlId - 記事のURL ID
 * @param themeColor - テーマカラー(Hex)
 */
export const setArticleThemeColor = async (articleUrlId, themeColor) => {
  const response = await axiosInstance.get("/items/articles", {
    params: {
      "filter[article_url_id][_eq]": articleUrlId,
      limit: 1
    }
  })

  const articleId = response.data.data?.[0]?.article_url_id

  if (!isDefined(articleId)) {
    return
  }

  await axiosInstance.patch(`/items/articles/${encodeURIComponent(articleId)}`, {
    theme_color: themeColor
  })
}

/** 全ての記事の本文を取得する */
export const getAllArticlesBody = async () => {
  const allArticleUrlIdList = await getAllArticleUrlIdList()
  const articles = await Promise.all(allArticleUrlIdList.map(getArticle))
  return articles.map(article => ({
    title: article.title,
    body: article.body
  }))
}
