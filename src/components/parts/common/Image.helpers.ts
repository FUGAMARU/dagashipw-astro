/**
 * srcSetを作成する
 *
 * @param source1x - 1xの画像URL
 * @param source2x - 2xの画像URL
 * @returns srcSet文字列
 */
export const createSourceSet = (source1x: string, source2x: string): string =>
  source1x === source2x ? `${source1x} 1x` : `${source1x} 1x, ${source2x} 2x`
