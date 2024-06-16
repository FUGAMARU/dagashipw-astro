import { lazy, type ReactNode } from "react"

import type { SvgComponentName, SvgProps } from "@/types/svg"

const SVG_COMPONENTS = {
  search: lazy(() => import("@/components/parts/svg/IconSearch")),
  snsX: lazy(() => import("@/components/parts/svg/IconSnsX")),
  snsFacebook: lazy(() => import("@/components/parts/svg/IconSnsFacebook")),
  snsLine: lazy(() => import("@/components/parts/svg/IconSnsLine")),
  snsHatenaBookmark: lazy(() => import("@/components/parts/svg/IconSnsHatenaBookmark")),
  linkCircle: lazy(() => import("@/components/parts/svg/IconLinkCircle"))
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
