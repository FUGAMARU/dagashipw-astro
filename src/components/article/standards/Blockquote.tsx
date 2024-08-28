import styles from "@/components/article/standards/Blockquote.module.css"

import type { Children } from "@/types/children"
import type { ReactNode } from "react"

/**
 * Blockquoteタグコンポーネント
 * @returns ReactNode
 */
const Blockquote = ({ children }: Children): ReactNode => {
  return (
    <blockquote className={styles.blockquoteTag}>
      <div className={styles.bar} />
      {children}
    </blockquote>
  )
}

export default Blockquote
