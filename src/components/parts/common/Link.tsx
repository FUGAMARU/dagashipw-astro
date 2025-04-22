import { SITE_ORIGIN } from "@/constants/env"
import { isDefined } from "@/utils"

import type { ComponentProps } from "react"

/** Props */
type Props = Omit<ComponentProps<"a">, "rel" | "target">

/** リンク */
export const Link = ({ href, children, ...rest }: Props) => {
  const isExternalLink =
    isDefined(href) &&
    !(href.startsWith(SITE_ORIGIN) || href.startsWith("http://localhost")) &&
    href.startsWith("http") // httpsもここに含まれる

  if (isExternalLink) {
    return (
      <a href={href} rel="noopener noreferrer" target="_blank" {...rest}>
        {children}
      </a>
    )
  }

  return (
    <a href={href} {...rest}>
      {children}
    </a>
  )
}
