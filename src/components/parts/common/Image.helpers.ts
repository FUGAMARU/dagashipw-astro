import { createHmac } from "node:crypto"

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
 * TODO: node:cryptoのcreateHmacを使っているため、CSRするコンポーネントでImageコンポーネントを使おうとすると詰むので対応する必要がある。対応する場合はAstroに画像URL取得用のAPIを設ける必要がありそう。
 *
 * @param originalImageUrl - オリジナル画像のURL
 * @returns 軽量化された画像のURL
 */
export const getLightweightImageUrl = (originalImageUrl: string): string => {
  // CMSで管理していないリモート画像や既に軽量化されているwebpの場合はそのまま返す
  if (!originalImageUrl.startsWith(API_ORIGIN) || originalImageUrl.endsWith(".webp")) {
    return originalImageUrl
  }

  const filename = originalImageUrl.replace(`${API_ORIGIN}${CMS_STATIC_CONTENTS_DIRECTORY}/`, "")
  const path = `/default/plain/local:///${filename}`

  const hmac = createHmac("sha256", decodeHexToBuffer(IMGPROXY_SIGNING_KEY))
  hmac.update(decodeHexToBuffer(IMGPROXY_SIGNING_SALT))
  hmac.update(path)
  const signature = hmac.digest("base64url")

  return `${IMGPROXY_ORIGIN}/${signature}${path}`
}
