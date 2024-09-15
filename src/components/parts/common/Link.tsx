import { useMemo, type ReactNode } from "react"

/** Props */
type Props = {
  /** リンク先URL */
  href: string
  /** 子要素 */
  children: ReactNode
}

/** リンク */
export const Link = ({ href, children }: Props) => {
  const isExternalLink = useMemo(() => href.startsWith("http") || href.startsWith("https"), [href])

  if (isExternalLink) {
    return (
      <a href={href} rel="noopener noreferrer" target="_blank">
        {children}
      </a>
    )
  }

  return <a href={href}>{children}</a>
}
