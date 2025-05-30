/**
 * @file 目次に関する型定義
 */

/** 見出し */
export type NestedHeading = {
  /** タイトル */
  title: string
  /** リンク */
  href: string
  /** h3の見出し情報 */
  h3?: Array<NestedHeading>
}

/** H4レベルのアイテム構造 */
export type H4ItemStructure = Omit<NestedHeading, "h3">

/** H3レベルのアイテム構造 */
export type H3ItemStructure = Omit<NestedHeading, "h3"> & {
  /** h4 */
  h4?: Array<H4ItemStructure>
}

/** H2レベルのアイテム構造 */
export type H2ItemStructure = Omit<NestedHeading, "h3"> & {
  /** h3 */
  h3?: Array<H3ItemStructure>
}

/** 目次のデーター型 */
export type TableOfContentsData = Array<{
  /** h2 */
  h2: H2ItemStructure
}>
