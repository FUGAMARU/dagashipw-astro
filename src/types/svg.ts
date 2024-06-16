/**
 * @file SVGに関する型定義
 */

/** SVGコンポーネントの共通Props */
export type SvgProps = {
  /** 幅 */
  width: number
  /** 高さ */
  height: number
  /** クラス */
  className?: string
}

/** SVGコンポーネント名一覧 */
export type SvgComponentName =
  | "search"
  | "linkCircle"
  | "snsX"
  | "snsFacebook"
  | "snsLine"
  | "snsHatenaBookmark"
