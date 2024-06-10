import { lazy, type ReactNode } from "react"

import type { IconProps } from "@/types/icon"

type IconName = "search"

const ICONS = {
  search: lazy(() => import("@/components/parts/icon/IconSearch"))
} as const satisfies Record<IconName, (props: IconProps) => ReactNode>

type Props = IconProps & {
  /** アイコン名 */
  name: IconName
}

/**
 * アイコン
 * @returns ReactNode
 */
const Icon = ({ name, ...props }: Props): ReactNode => {
  const IconComponent = ICONS[name]

  return <IconComponent {...props} />
}

export default Icon
