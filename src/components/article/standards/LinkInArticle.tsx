import styles from "@/components/article/standards/LinkInArticle.module.css"
import { Link } from "@/components/parts/common/Link"

import type { Children } from "@/types/children"

/** Props */
type Props = {
  /** 遷移先 */
  href: string
} & Children

/** 記事中に登場するリンク */
export const LinkInArticle = ({ href, children }: Props) => {
  return (
    <Link className={styles.linkInArticle} href={href}>
      {children}
    </Link>
  )
}
