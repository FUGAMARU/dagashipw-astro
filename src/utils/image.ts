/**
 * @file 画像関連の関数群
 */

import { API_ORIGIN } from "@/constants/env"

import type { ImageSizeType, ImageSources, AssetPresets } from "@/types/image"

/**
 * Directusのアセット変換URLを生成する
 *
 * @param absoluteImageUrl - オリジナル画像の絶対URL
 * @param preset - Directusのアセット変換で定義したプリセット名
 * @returns アセット変換URL
 */
const getAssetTransformUrl = (absoluteImageUrl: string, preset: AssetPresets): string => {
  // CMSで管理していないリモート画像の場合はそのまま返す
  if (!absoluteImageUrl.startsWith(API_ORIGIN)) {
    return absoluteImageUrl
  }

  return `${absoluteImageUrl}?key=${preset}`
}

/**
 * レスポンシブ対応用に画像のURLセットを生成する
 *
 * @param originalUrl - オリジナル画像のURL
 * @returns レスポンシブ対応用のURLセット
 */
export const generateImageSources = (originalUrl: string): ImageSources => {
  const normalUrls = generateSizeUrls(originalUrl, "normal")
  const smallerUrls = generateSizeUrls(originalUrl, "smaller")

  return {
    normal: normalUrls,
    smaller: smallerUrls
  }
}

/**
 * 指定されたサイズの画像URLセットを生成する
 *
 * @param originalUrl - オリジナル画像のURL
 * @param sizeType - サイズタイプ
 * @returns 画像URLセット
 */
const generateSizeUrls = (
  originalUrl: string,
  sizeType: ImageSizeType
): {
  /** PC 1倍 */
  pc1x: string
  /** PC 2倍 */
  pc2x: string
  /** SP 1倍 */
  sp1x: string
  /** SP 2倍 */
  sp2x: string
} => {
  const presets: Array<{
    /** プリセット名に対応するキー */
    key: "pc1x" | "pc2x" | "sp1x" | "sp2x"
    /** プリセット名 */
    name: AssetPresets
  }> = [
    { key: "pc1x", name: `${sizeType}-pc` },
    { key: "pc2x", name: `${sizeType}-pc-2x` },
    { key: "sp1x", name: `${sizeType}-sp` },
    { key: "sp2x", name: `${sizeType}-sp-2x` }
  ]

  const urlMap = Object.fromEntries(
    presets.map(({ key, name }) => [key, getAssetTransformUrl(originalUrl, name)])
  ) as Record<"pc1x" | "pc2x" | "sp1x" | "sp2x", string>

  return {
    pc1x: urlMap.pc1x,
    pc2x: urlMap.pc2x,
    sp1x: urlMap.sp1x,
    sp2x: urlMap.sp2x
  }
}
