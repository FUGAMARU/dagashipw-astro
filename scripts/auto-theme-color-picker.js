/* eslint-disable no-restricted-imports */
/**
 * @file 記事のサムネイルからテーマカラーを自動で一括取得するスクリプト
 */

import path from "node:path"
import { createInterface } from "node:readline"
import { fileURLToPath } from "node:url"
import { promisify } from "node:util"
import { Worker } from "node:worker_threads"

import { isDefined, getAllArticleUrlIdList, getArticle, API_ORIGIN } from "./utils.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/** テーマカラーの処理対象 */
const PROCESS_TARGET = {
  ONLY_UNSET: "only-unset",
  ALL: "all"
}

/**
 * テーマカラーが未設定かどうかを判定する
 *
 * @param themeColor - テーマカラー
 * @returns 未設定かどうか
 */
const isThemeColorUnset = themeColor =>
  !isDefined(themeColor) || (typeof themeColor === "string" && themeColor.trim().length === 0)

/**
 * テーマカラーの処理対象を選択する
 *
 * @returns テーマカラーの処理対象
 */
const selectProcessTarget = async () => {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  })
  const question = promisify(rl.question).bind(rl)

  try {
    while (true) {
      const answer = await question(
        "テーマカラーの処理対象を選択してください。\n1. テーマカラー未設定の記事のみ（デフォルト）\n2. 全ての記事\n番号を入力してください [1] > "
      )
      const normalizedAnswer = answer.trim()

      if (normalizedAnswer === "" || normalizedAnswer === "1") {
        return PROCESS_TARGET.ONLY_UNSET
      }

      if (normalizedAnswer === "2") {
        return PROCESS_TARGET.ALL
      }

      console.log("1または2を入力してください")
    }
  } finally {
    rl.close()
  }
}

/** Main */
const main = async () => {
  const processTarget = await selectProcessTarget()
  const allArticleUrlIdList = await getAllArticleUrlIdList()

  const articles = await Promise.all(allArticleUrlIdList.map(getArticle))

  const articleThumbnails = articles
    .filter(article => {
      if (!isDefined(article)) {
        return false
      }

      if (processTarget === PROCESS_TARGET.ONLY_UNSET && !isThemeColorUnset(article.themeColor)) {
        return false
      }

      const originalThumbnailUrl = article.originalThumbnailUrl
      return typeof originalThumbnailUrl === "string" && originalThumbnailUrl.length > 0
    })
    .map(article => ({
      originalThumbnailUrl: String(article.originalThumbnailUrl),
      articleUrlId: article.articleUrlId,
      thumbnailUrl: /^https?:\/\//.test(String(article.originalThumbnailUrl))
        ? String(article.originalThumbnailUrl)
        : `${API_ORIGIN}${String(article.originalThumbnailUrl)}`
    }))

  if (articleThumbnails.length === 0) {
    console.log("処理対象の記事がありません")
    return
  }

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
