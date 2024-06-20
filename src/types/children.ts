/**
 * @file childrenを型定義するためのファイル
 */

import type { ReactNode } from "react"

/** ChildrenのみPropsで受け取る時用の型 */
export type Children = {
  /** children */
  children: ReactNode
}
