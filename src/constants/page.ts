/**
 * @file ページに関する定数定義
 */

import type { PageNameKey } from "@/types/page"

/** ページパス一覧 */
export const PAGE_PATH = {
  TOP: "/"
} as const

/** ページタイトル一覧 */
export const PAGE_NAME = {
  /** トップページ */
  TOP: "麩菓子の雑記帳"
} as const satisfies Record<PageNameKey, string>
