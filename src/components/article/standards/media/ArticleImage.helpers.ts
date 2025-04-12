import axios from "axios"
import { imageSize } from "image-size"

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
