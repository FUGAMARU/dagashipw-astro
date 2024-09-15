/**
 * @file 目次に関する型定義 (TODO: 目次のためだけにファイルを切り出すのは渋いので実装フェーズ後半でまとめるのもあり)
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

/** 目次のデーター型 */
export type TableOfContentsData = Array<{
  /** h2 */
  h2: Omit<NestedHeading, "h3"> & {
    /** h3 */
    h3?: Array<
      Omit<NestedHeading, "h3"> & {
        /** h4 */
        h4?: Array<Omit<NestedHeading, "h3">>
      }
    >
  }
}>
