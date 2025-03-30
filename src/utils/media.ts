/**
 * @file メディア関連の関数群
 */

import { createHmac } from "node:crypto"

import axios from "axios"
import { imageSize } from "image-size"

import {
  API_ORIGIN,
  CMS_STATIC_CONTENTS_DIRECTORY,
  IMGPROXY_ORIGIN,
  IMGPROXY_SIGNING_KEY,
  IMGPROXY_SIGNING_SALT
} from "@/constants/env"

/**
 * CMSのオリジナル画像URLから軽量化された画像URLを取得する
 * TODO: node:cryptoのcreateHmacを使っているため、CSRするコンポーネントでImageコンポーネントを使おうとすると詰むので対応する必要がある。対応する場合はAstroに画像URL取得用のAPIを設ける必要がありそう。
 *
 * @param originalImageUrl - オリジナル画像のURL
 * @returns 軽量化された画像のURL
 */
export const getLightweightImageUrl = (originalImageUrl: string): string => {
  // 拡張子がwebpの場合は既に軽量化されている画像なのでそのまま返す
  if (originalImageUrl.endsWith(".webp")) {
    return originalImageUrl
  }

  const filename = originalImageUrl.replace(`${API_ORIGIN}${CMS_STATIC_CONTENTS_DIRECTORY}/`, "")
  const path = `/default/plain/local:///${filename}`

  /**
   * HexをBufferにデコードする
   *
   * @param hex - Hex文字列
   * @returns Buffer
   */
  const decodeHexToBuffer = (hex: string): Uint8Array => new Uint8Array(Buffer.from(hex, "hex"))

  const hmac = createHmac("sha256", decodeHexToBuffer(IMGPROXY_SIGNING_KEY))
  hmac.update(decodeHexToBuffer(IMGPROXY_SIGNING_SALT))
  hmac.update(path)
  const signature = hmac.digest("base64url")

  return `${IMGPROXY_ORIGIN}/${signature}${path}`
}

/**
 * リモート画像のサイズを取得する
 *
 * @param src - 画像URL
 * @returns 画像サイズ
 */
export const getRemoteImageSize = async (
  src: string
): Promise<{
  /** 横幅 */
  width: number
  /** 高さ */
  height: number
}> => {
  const response = await axios.get(src, {
    responseType: "arraybuffer"
  })

  const buffer = Buffer.from(response.data)
  const uint8Array = new Uint8Array(buffer)

  const { width, height } = imageSize(uint8Array)

  return { width, height }
}
