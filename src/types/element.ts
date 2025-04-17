/**
 * @file 要素に関連する型定義
 */

import type { BackNumber } from "@/components/parts/BackNumber"
import type { Tag } from "@/components/parts/Tag"
import type { ArticleInfoBar } from "@/components/templates/ArticleInfoBar"
import type { ComponentProps } from "react"

/** Heroコンポーネント共通Props */
export type HeroProps = {
  /** サムネイル */
  thumbnailUrl: string
  /** タイトル */
  title: string
  /** タグ一覧 */
  tags: Array<ComponentProps<typeof Tag>["text"]>
} & ComponentProps<typeof BackNumber> &
  Pick<ComponentProps<typeof ArticleInfoBar>, "articleUrlId" | "createdAt" | "updatedAt">
