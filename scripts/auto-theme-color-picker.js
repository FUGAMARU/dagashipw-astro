/* eslint-disable no-restricted-imports */
/**
 * @file 記事のサムネイルからテーマカラーを自動で一括取得するスクリプト
 */

import path from "node:path"
import { fileURLToPath } from "node:url"
import { Worker } from "node:worker_threads"

import { isDefined, getAllArticleUrlIds, getArticle, STRAPI_BASE_URL } from "./utils.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/** Main */
const main = async () => {
  const allArticleUrlIdList = await getAllArticleUrlIds()

  const articles = await Promise.all(allArticleUrlIdList.map(getArticle))

  const articleThumbnails = articles
    .filter(article => {
      const thumbnail = article.thumbnail.data?.attributes?.url
      return isDefined(article) && isDefined(thumbnail)
    })
    .map(article => ({
      articleUrlId: article.articleUrlId,
      thumbnailUrl: `${STRAPI_BASE_URL}${article.thumbnail.data?.attributes?.url}`
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
