/**
 * @file ページに関する定数定義
 */

import type { PageNameKey } from "@/types/page"

/** ページパス一覧 */
export const PAGE_PATH = {
  TOP: "/",
  ARTICLE_LIST_WITH_PAGE: "/page/[page]",
  SEARCH: "/search"
} as const

/** ページタイトル一覧 */
export const PAGE_NAME = {
  /** トップページ */
  TOP: "麩菓子の雑記帳",
  /** 記事一覧ページ */
  ARTICLE_LIST_WITH_PAGE: "記事一覧 | 麩菓子の雑記帳",
  /** 検索ページ */
  SEARCH: "[keyword]の検索結果一覧 | 麩菓子の雑記帳"
} as const satisfies Record<PageNameKey, string>
