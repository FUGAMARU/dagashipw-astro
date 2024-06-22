import Link from "@/components/parts/common/Link"
import SvgLoader from "@/components/parts/svg/SvgLoader"
import styles from "@/components/parts/Tag.module.css"

import type { ReactNode } from "react"

type Props = {
  /** テキスト */
  text: string
  /** 遷移先 */
  href: string
}

/**
 * タグ
 * @returns ReactNode
 */
const Tag = ({ text, href }: Props): ReactNode => {
  return (
    <Link href={href}>
      <span className={styles.tagComponent}>
        <SvgLoader className={styles.icon} height={16} name="hash" width={16} />
        <span>{text}</span>
      </span>
    </Link>
  )
}

export default Tag
