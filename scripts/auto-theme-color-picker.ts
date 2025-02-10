/**
 * @file 記事のサムネイルからテーマカラーを自動で一括取得するスクリプト
 */

import path from "node:path"
import { Worker } from "node:worker_threads"

import { getAllArticleUrlIds, getArticle } from "@/services/api"
import { isDefined } from "@/utils/isDefined"

/** Main */
const main = async (): Promise<void> => {
  const allArticleUrlIdList = await getAllArticleUrlIds()

  const articles = await Promise.all(allArticleUrlIdList.map(getArticle))

  const articleThumbnails = articles
    .filter(isDefined)
    .map(article => ({
      articleUrlId: article.articleUrlId,
      thumbnailUrl: article.thumbnail.data?.attributes?.url ?? ""
    }))
    .filter(article => article.thumbnailUrl !== "")

  let completedWorkers = 0

  articleThumbnails.forEach((payload, index) => {
    const worker = new Worker(path.resolve(__dirname, "./auto-theme-color-picker-worker.js"), {
      workerData: { payload, index }
    })

    worker.on("message", (processedArticleUrlId: string) => {
      completedWorkers++

      console.log(`処理完了: ${processedArticleUrlId}`)

      if (completedWorkers === articleThumbnails.length) {
        console.log("全ての処理が完了しました")
      }
    })
  })
}

main()
