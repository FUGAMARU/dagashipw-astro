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

/**
 * HexをBufferにデコードする
 *
 * @param hex - Hex文字列
 * @returns Buffer
 */
const decodeHexToBuffer = (hex: string): Uint8Array => new Uint8Array(Buffer.from(hex, "hex"))

/**
 * CMSのオリジナル画像URLから軽量化された画像URLを取得する
 *
 * @param originalImageUrl - オリジナル画像のURL
 * @returns 軽量化された画像のURL
 */
export const getLightweightImageUrl = async (originalImageUrl: string): Promise<string> => {
  const nodeCrypto = await import("node:crypto") // ビルド時に「"createHmac" is not exported by "__vite-browser-external"」エラーが出るのを防ぐためにここで動的インポート

  // CMSで管理していないリモート画像や既に軽量化されているwebpの場合はそのまま返す
  if (!originalImageUrl.startsWith(API_ORIGIN) || originalImageUrl.endsWith(".webp")) {
    return originalImageUrl
  }

  const filename = originalImageUrl.replace(`${API_ORIGIN}${CMS_STATIC_CONTENTS_DIRECTORY}/`, "")
  const path = `/default/plain/local:///${filename}`

  const hmac = nodeCrypto.createHmac("sha256", decodeHexToBuffer(IMGPROXY_SIGNING_KEY))
  hmac.update(decodeHexToBuffer(IMGPROXY_SIGNING_SALT))
  hmac.update(path)
  const signature = hmac.digest("base64url")

  return `${IMGPROXY_ORIGIN}/${signature}${path}`
}
