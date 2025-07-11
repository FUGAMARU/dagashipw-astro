import clsx from "clsx"
import { forwardRef, lazy } from "react"

import styles from "@/components/parts/svg/SvgLoader.module.css"

import type { SvgComponentName } from "@/types/svg"
import type { LazyExoticComponent, ReactNode } from "react"

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
  notByAi: lazy(() =>
    import("@/components/parts/svg/IconNotByAi").then(({ IconNotByAi }) => ({
      default: IconNotByAi
    }))
  ),
  warning: lazy(() =>
    import("@/components/parts/svg/IconWarning").then(({ IconWarning }) => ({
      default: IconWarning
    }))
  ),
  inspiration: lazy(() =>
    import("@/components/parts/svg/IconInspiration").then(({ IconInspiration }) => ({
      default: IconInspiration
    }))
  ),
  roundedTriangleDown: lazy(() =>
    import("@/components/parts/svg/IconRoundedTriangleDown").then(
      ({ IconRoundedTriangleDown }) => ({
        default: IconRoundedTriangleDown
      })
    )
  ),
  download: lazy(() =>
    import("@/components/parts/svg/IconDownload").then(({ IconDownload }) => ({
      default: IconDownload
    }))
  ),
  arrowDown: lazy(() =>
    import("@/components/parts/svg/IconArrowDown").then(({ IconArrowDown }) => ({
      default: IconArrowDown
    }))
  ),
  clock: lazy(() =>
    import("@/components/parts/svg/IconClock").then(({ IconClock }) => ({ default: IconClock }))
  ),
  penPlus: lazy(() =>
    import("@/components/parts/svg/IconPenPlus").then(({ IconPenPlus }) => ({
      default: IconPenPlus
    }))
  ),
  copy: lazy(() =>
    import("@/components/parts/svg/IconCopy").then(({ IconCopy }) => ({ default: IconCopy }))
  ),
  checkCircle: lazy(() =>
    import("@/components/parts/svg/IconCheckCircle").then(({ IconCheckCircle }) => ({
      default: IconCheckCircle
    }))
  ),
  turnBackArrow: lazy(() =>
    import("@/components/parts/svg/IconTurnBackArrow").then(({ IconTurnBackArrow }) => ({
      default: IconTurnBackArrow
    }))
  ),
  cross: lazy(() =>
    import("@/components/parts/svg/IconCross").then(({ IconCross }) => ({ default: IconCross }))
  ),
  labelPlus: lazy(() =>
    import("@/components/parts/svg/IconLabelPlus").then(({ IconLabelPlus }) => ({
      default: IconLabelPlus
    }))
  ),
  spinner: lazy(() =>
    import("@/components/parts/svg/IconSpinner").then(({ IconSpinner }) => ({
      default: IconSpinner
    }))
  ),
  verified: lazy(() =>
    import("@/components/parts/svg/IconVerified").then(({ IconVerified }) => ({
      default: IconVerified
    }))
  ),
  check: lazy(() =>
    import("@/components/parts/svg/IconCheck").then(({ IconCheck }) => ({ default: IconCheck }))
  )
} as const satisfies Record<SvgComponentName, LazyExoticComponent<() => ReactNode>>

/** Props */
type Props = {
  /** SVGコンポーネント名 */
  name: SvgComponentName
  /** クラス */
  className?: string
}

/** SVG親コンポーネント */
export const SvgLoader = forwardRef<HTMLSpanElement, Props>(({ name, className }, ref) => {
  const SvgComponent = SVG_COMPONENTS[name]

  return (
    <span ref={ref} className={clsx(className, styles.svgLoader)}>
      <SvgComponent />
    </span>
  )
})

SvgLoader.displayName = "SvgLoader"
