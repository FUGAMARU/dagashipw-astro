/**
 * @file ページに関する型定義
 */

import type { PAGE_PATH } from "@/constants/page"

/** ページパス一覧 */
export type PagePath = (typeof PAGE_PATH)[keyof typeof PAGE_PATH]

/** ページ名キー一覧 */
export type PageNameKey = keyof typeof PAGE_PATH
