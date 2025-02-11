/* eslint-disable no-restricted-imports */
/**
 * @file 記事のサムネイルからテーマカラーを自動で一括取得するスクリプトのWorker
 */

import { parentPort, workerData, threadId } from "node:worker_threads"

import { Vibrant } from "node-vibrant/node"
import sharp from "sharp"

import { setArticleThemeColor } from "./utils.js"

/** サムネイルからテーマカラーを取得できなかった場合のフォールバック色 */
const THEME_COLOR_FALLBACK = "#343434"

/**
 * テーマカラーを取得する
 *
 * @param src - 画像ソース
 * @returns テーマカラー (HEX)
 */
const getThemeColor = async src => {
  const palette = await Vibrant.from(src).getPalette()
  return palette.Vibrant?.hex ?? THEME_COLOR_FALLBACK
}

/** Main */
const main = async () => {
  const articleUrlId = workerData.payload.articleUrlId
  const thumbnailUrl = workerData.payload.thumbnailUrl

  console.log(`#${threadId}】処理中: ${articleUrlId}`)

  const isWebp = thumbnailUrl.endsWith(".webp")

  let themeColor = THEME_COLOR_FALLBACK

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (isWebp) {
    const response = await fetch(thumbnailUrl)

    if (!response.ok) {
      console.error(`画像の取得に失敗しました: ${thumbnailUrl}`)
    }

    const responseBuffer = await response.arrayBuffer()
    const webpBuffer = Buffer.from(responseBuffer)
    const pngBuffer = await sharp(webpBuffer).toFormat("png").toBuffer()

    themeColor = await getThemeColor(pngBuffer)
  } else {
    themeColor = await getThemeColor(thumbnailUrl)
  }

  await setArticleThemeColor(articleUrlId, themeColor)

  parentPort?.postMessage({
    articleUrlId,
    themeColor
  })
}

main()
