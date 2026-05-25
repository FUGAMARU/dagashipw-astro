/* eslint-disable no-restricted-imports */
/**
 * @file 記事のサムネイルからテーマカラーを自動で一括取得するスクリプト
 */

import path from "node:path"
import { fileURLToPath } from "node:url"
import { Worker } from "node:worker_threads"

import { isDefined, getAllArticleUrlIdList, getArticle, API_ORIGIN } from "./utils.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/** Main */
const main = async () => {
  const allArticleUrlIdList = await getAllArticleUrlIdList()

  const articles = await Promise.all(allArticleUrlIdList.map(getArticle))

  const articleThumbnails = articles
    .filter(article => {
      const originalThumbnailUrl = article.originalThumbnailUrl
      return (
        isDefined(article) &&
        typeof originalThumbnailUrl === "string" &&
        originalThumbnailUrl.length > 0
      )
    })
    .map(article => ({
      originalThumbnailUrl: String(article.originalThumbnailUrl),
      articleUrlId: article.articleUrlId,
      thumbnailUrl: /^https?:\/\//.test(String(article.originalThumbnailUrl))
        ? String(article.originalThumbnailUrl)
        : `${API_ORIGIN}${String(article.originalThumbnailUrl)}`
    }))

  let completedWorkers = 0

  articleThumbnails.forEach((payload, index) => {
    const worker = new Worker(path.resolve(__dirname, "./auto-theme-color-picker-worker.js"), {
      workerData: { payload, index }
    })

    worker.on("message", payload => {
      completedWorkers++

      console.log(`✅️処理完了: ${payload.articleUrlId} -> ${payload.themeColor}`)

      if (completedWorkers === articleThumbnails.length) {
        console.log("全ての処理が完了しました✨")
      }
    })
  })
}

main()
