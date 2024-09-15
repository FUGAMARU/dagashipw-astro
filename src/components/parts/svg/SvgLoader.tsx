import { lazy, type ReactNode } from "react"

import type { SvgComponentName, SvgProps } from "@/types/svg"

const SVG_COMPONENTS = {
  search: lazy(() =>
    import("@/components/parts/svg/IconSearch").then(({ IconSearch }) => ({ default: IconSearch }))
  ),
  snsX: lazy(() =>
    import("@/components/parts/svg/IconSnsX").then(({ IconSnsX }) => ({ default: IconSnsX }))
  ),
  snsFacebook: lazy(() =>
    import("@/components/parts/svg/IconSnsFacebook").then(({ IconSnsFacebook }) => ({
      default: IconSnsFacebook
    }))
  ),
  snsLine: lazy(() =>
    import("@/components/parts/svg/IconSnsLine").then(({ IconSnsLine }) => ({
      default: IconSnsLine
    }))
  ),
  snsHatenaBookmark: lazy(() =>
    import("@/components/parts/svg/IconSnsHatenaBookmark").then(({ IconSnsHatenaBookmark }) => ({
      default: IconSnsHatenaBookmark
    }))
  ),
  linkCircle: lazy(() =>
    import("@/components/parts/svg/IconLinkCircle").then(({ IconLinkCircle }) => ({
      default: IconLinkCircle
    }))
  ),
  hash: lazy(() =>
    import("@/components/parts/svg/IconHash").then(({ IconHash }) => ({ default: IconHash }))
  ),
  writingPen: lazy(() =>
    import("@/components/parts/svg/IconWritingPen").then(({ IconWritingPen }) => ({
      default: IconWritingPen
    }))
  ),
  reverseClock: lazy(() =>
    import("@/components/parts/svg/IconReverseClock").then(({ IconReverseClock }) => ({
      default: IconReverseClock
    }))
  ),
  commentWithPen: lazy(() =>
    import("@/components/parts/svg/IconCommentWithPen").then(({ IconCommentWithPen }) => ({
      default: IconCommentWithPen
    }))
  ),
  doubleRightArrow: lazy(() =>
    import("@/components/parts/svg/IconDoubleRightArrow").then(({ IconDoubleRightArrow }) => ({
      default: IconDoubleRightArrow
    }))
  ),
  background: lazy(() =>
    import("@/components/parts/svg/PatternBackground").then(({ PatternBackground }) => ({
      default: PatternBackground
    }))
  ),
  notByAi: lazy(() =>
    import("@/components/parts/svg/IconNotByAi").then(({ IconNotByAi }) => ({
      default: IconNotByAi
    }))
  ),
  warning: lazy(() =>
    import("@/components/parts/svg/IconWarning").then(({ IconWarning }) => ({
      default: IconWarning
    }))
  )
} as const satisfies Record<SvgComponentName, (props: SvgProps) => ReactNode>

/** Props */
type Props = {
  /** SVGコンポーネント名 */
  name: SvgComponentName
} & SvgProps

/** SVG親コンポーネント */
export const SvgLoader = ({ name, ...props }: Props) => {
  const SvgComponent = SVG_COMPONENTS[name]

  return <SvgComponent {...props} />
}
