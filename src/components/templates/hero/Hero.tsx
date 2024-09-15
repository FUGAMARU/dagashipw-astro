import { useMemo, type ComponentProps } from "react"

import { HeroPC } from "@/components/templates/hero/HeroPC"
import { HeroSP } from "@/components/templates/hero/HeroSP"

import type { BackNumber } from "@/components/parts/BackNumber"
import type { Tag } from "@/components/parts/Tag"
import type { ArticleInfoBar } from "@/components/templates/ArticleInfoBar"

/** Heroコンポーネント共通Props */
export type HeroProps = {
  /** サムネイル */
  thumbnailUrl: string
  /** タイトル */
  title: string
  /** タグ一覧 */
  tags: Array<ComponentProps<typeof Tag>["text"]>
} & ComponentProps<typeof BackNumber> &
  Pick<ComponentProps<typeof ArticleInfoBar>, "createdAt" | "updatedAt" | "commentCount">

/** Props */
type Props = {
  /** デバイス */
  device: "pc" | "sp"
} & HeroProps

/** Hero親コンポーネント */
export const Hero = ({ device, ...props }: Props) => {
  const HeroComponent = useMemo(() => (device === "pc" ? HeroPC : HeroSP), [device])

  return <HeroComponent {...props} />
}
