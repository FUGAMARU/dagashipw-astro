/**
 * @file 記事のサムネイルからテーマカラーを自動で一括取得するスクリプトのWorker
 */

import { parentPort, workerData } from "worker_threads"

import { Vibrant } from "node-vibrant/node"
import sharp from "sharp"

import { setArticleThemeColor } from "@/services/api"

import type { ImageSource } from "@vibrant/image"

/** サムネイルからテーマカラーを取得できなかった場合のフォールバック色 */
const THEME_COLOR_FALLBACK = "#343434"

/**
 * テーマカラーを取得する
 *
 * @param src - 画像ソース
 * @returns テーマカラー (HEX)
 */
const getThemeColor = async (src: ImageSource): Promise<string> => {
  const palette = await Vibrant.from(src).getPalette()
  return palette.Vibrant?.hex ?? THEME_COLOR_FALLBACK
}

/** Main */
const main = async (): Promise<void> => {
  const articleUrlId = workerData.payload.articleUrlId as string
  const thumbnailUrl = workerData.payload.thumbnailUrl as string

  const isWebp = thumbnailUrl.endsWith(".webp")

  let themeColor = THEME_COLOR_FALLBACK

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

  parentPort?.postMessage(articleUrlId)
}

main()
