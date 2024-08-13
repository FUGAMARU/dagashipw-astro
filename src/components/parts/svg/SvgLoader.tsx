import { lazy, type ReactNode } from "react"

import type { SvgComponentName, SvgProps } from "@/types/svg"

const SVG_COMPONENTS = {
  search: lazy(() => import("@/components/parts/svg/IconSearch")),
  snsX: lazy(() => import("@/components/parts/svg/IconSnsX")),
  snsFacebook: lazy(() => import("@/components/parts/svg/IconSnsFacebook")),
  snsLine: lazy(() => import("@/components/parts/svg/IconSnsLine")),
  snsHatenaBookmark: lazy(() => import("@/components/parts/svg/IconSnsHatenaBookmark")),
  linkCircle: lazy(() => import("@/components/parts/svg/IconLinkCircle")),
  hash: lazy(() => import("@/components/parts/svg/IconHash")),
  writingPen: lazy(() => import("@/components/parts/svg/IconWritingPen")),
  reverseClock: lazy(() => import("@/components/parts/svg/IconReverseClock")),
  commentWithPen: lazy(() => import("@/components/parts/svg/IconCommentWithPen")),
  doubleRightArrow: lazy(() => import("@/components/parts/svg/IconDoubleRightArrow")),
  background: lazy(() => import("@/components/parts/svg/PatternBackground"))
} as const satisfies Record<SvgComponentName, (props: SvgProps) => ReactNode>

type Props = {
  /** SVGコンポーネント名 */
  name: SvgComponentName
} & SvgProps

/**
 * SVG親コンポーネント
 * @returns ReactNode
 */
const SvgLoader = ({ name, ...props }: Props): ReactNode => {
  const SvgComponent = SVG_COMPONENTS[name]

  return <SvgComponent {...props} />
}

export default SvgLoader
