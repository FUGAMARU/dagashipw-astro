import styles from "@/components/article/standards/LinkInArticle.module.css"
import Link from "@/components/parts/common/Link"

import type { Children } from "@/types/children"
import type { ReactNode } from "react"

type Props = {
  /** 遷移先 */
  href: string
} & Children

/**
 * 記事中に登場するリンク
 * @returns ReactNode
 */
const LinkInArticle = ({ href, children }: Props): ReactNode => {
  return (
    <Link href={href}>
      <span className={styles.linkInArticle}>{children}</span>
    </Link>
  )
}

export default LinkInArticle
