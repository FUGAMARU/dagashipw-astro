/**
 * @file 画像関連の関数群
 */

import {
  API_ORIGIN,
  CMS_STATIC_CONTENTS_DIRECTORY,
  IMGPROXY_ORIGIN,
  IMGPROXY_SIGNING_KEY,
  IMGPROXY_SIGNING_SALT
} from "@/constants/env"

import type { ImageSizeType, ImageSources, ImgproxyPresets } from "@/types/image"

/**
 * HexをBufferにデコードする
 *
 * @param hex - Hex文字列
 * @returns Buffer
 */
const decodeHexToBuffer = (hex: string): Uint8Array => new Uint8Array(Buffer.from(hex, "hex"))

/**
 * imgproxyの署名付きURLを生成する
 *
 * @param absoluteImageUrl - オリジナル画像の絶対URL
 * @param preset - imgproxyの設定で定義したプリセット名
 * @returns 署名付きimgproxy URL
 */
const getSignedImgproxyUrl = async (
  absoluteImageUrl: string,
  preset: ImgproxyPresets
): Promise<string> => {
  const nodeCrypto = await import("node:crypto")

  // CMSで管理していないリモート画像や既に軽量化されているwebpの場合はそのまま返す
  if (!absoluteImageUrl.startsWith(API_ORIGIN) || absoluteImageUrl.endsWith(".webp")) {
    return absoluteImageUrl
  }

  const filename = absoluteImageUrl.replace(`${API_ORIGIN}${CMS_STATIC_CONTENTS_DIRECTORY}/`, "")
  const path = `/${preset}/plain/local:///${filename}`

  const hmac = nodeCrypto.createHmac("sha256", decodeHexToBuffer(IMGPROXY_SIGNING_KEY))
  hmac.update(decodeHexToBuffer(IMGPROXY_SIGNING_SALT))
  hmac.update(path)
  const signature = hmac.digest("base64url")

  return `${IMGPROXY_ORIGIN}/${signature}${path}`
}

/**
 * レスポンシブ対応用に画像のURLセットを生成する
 *
 * @param originalUrl - オリジナル画像のURL
 * @param imageSizeType - 画像のサイズ種別
 * @returns レスポンシブ対応用のURLセット
 */
export const generateImageSources = async (
  originalUrl: string,
  imageSizeType: ImageSizeType
): Promise<ImageSources> => {
  const presets: Array<{
    /** プリセット名に対応するキー */
    key: keyof ImageSources
    /** プリセット名 */
    name: ImgproxyPresets
  }> = [
    { key: "pc1x", name: `${imageSizeType}-pc` },
    { key: "pc2x", name: `${imageSizeType}-pc-2x` },
    { key: "sp1x", name: `${imageSizeType}-sp` },
    { key: "sp2x", name: `${imageSizeType}-sp-2x` }
  ]

  const urlEntries = await Promise.all(
    presets.map(async ({ key, name }) => {
      const url = await getSignedImgproxyUrl(originalUrl, name)
      return [key, url]
    })
  )

  return Object.fromEntries(urlEntries)
}
