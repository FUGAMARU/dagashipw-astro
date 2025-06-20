import probe from "probe-image-size"

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
  const { width, height } = await probe(src)

  return { width, height }
}
