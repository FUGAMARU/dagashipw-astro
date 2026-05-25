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

/**
 * サムネイルURLからテーマカラーを取得する
 *
 * @param thumbnailUrl - サムネイルURL
 * @returns テーマカラー (HEX)
 */
const getThemeColorFromThumbnailUrl = async thumbnailUrl => {
  const response = await fetch(thumbnailUrl)

  if (!response.ok) {
    throw new Error(`画像の取得に失敗しました: ${thumbnailUrl}`)
  }

  const responseBuffer = await response.arrayBuffer()
  const imageBuffer = Buffer.from(responseBuffer)
  const pngBuffer = await sharp(imageBuffer).png().toBuffer()

  return getThemeColor(pngBuffer)
}

/** Main */
const main = async () => {
  const articleUrlId = workerData.payload.articleUrlId
  const thumbnailUrl = workerData.payload.thumbnailUrl

  console.log(`#${threadId}】処理中: ${articleUrlId}`)

  let themeColor = THEME_COLOR_FALLBACK

  try {
    themeColor = await getThemeColorFromThumbnailUrl(thumbnailUrl)
  } catch (error) {
    console.error(`テーマカラー取得に失敗しました: ${articleUrlId}`)
    console.error(error)
  }

  await setArticleThemeColor(articleUrlId, themeColor)

  parentPort?.postMessage({
    articleUrlId,
    themeColor
  })
}

main()
