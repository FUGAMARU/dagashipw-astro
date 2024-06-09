import { useMemo, type ReactNode } from "react"

type Props = {
  /** リンク先URL */
  href: string
  /** 子要素 */
  children: ReactNode
}

/**
 * リンク
 * @returns ReactNode
 */
const Link = ({ href, children }: Props): ReactNode => {
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

export default Link
