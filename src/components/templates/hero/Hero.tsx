import { useMemo, type ComponentProps, type ReactNode } from "react"

import HeroPC from "@/components/templates/hero/HeroPC"
import HeroSP from "@/components/templates/hero/HeroSP"

import type BackNumber from "@/components/parts/BackNumber"
import type Tag from "@/components/parts/Tag"
import type ArticleInfo from "@/components/templates/ArticleInfo"

/** Heroコンポーネント共通Props */
export type HeroProps = {
  /** サムネイル */
  thumbnailUrl: string
  /** タイトル */
  title: string
  /** タグ一覧 */
  tags: Array<ComponentProps<typeof Tag>["text"]>
} & ComponentProps<typeof BackNumber> &
  Pick<ComponentProps<typeof ArticleInfo>, "createdAt" | "updatedAt" | "commentCount">

type Props = {
  device: "pc" | "sp"
} & HeroProps

/**
 * Hero親コンポーネント
 * @returns ReactNode
 */
const Hero = ({ device, ...props }: Props): ReactNode => {
  const HeroComponent = useMemo(() => (device === "pc" ? HeroPC : HeroSP), [device])

  return <HeroComponent {...props} />
}

export default Hero
