/**
 * @file 目次に関する型定義 (TODO: 目次のためだけにファイルを切り出すのは渋いので実装フェーズ後半でまとめるのもあり)
 */

/** 目次のデーター型 */
export type TableOfContentsData = Array<{
  /** h2 */
  h2: {
    /** タイトル */
    title: string
    /** リンク */
    href: string
    /** h3 */
    h3?: Array<{
      /** タイトル */
      title: string
      /** リンク */
      href: string
      /** h4 */
      h4?: Array<{
        /** タイトル */
        title: string
        /** リンク */
        href: string
      }>
    }>
  }
}>
