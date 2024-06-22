import styles from "@/components/article/standards/heading/H3.module.css"

import type { Children } from "@/types/children"
import type { ReactNode } from "react"

/**
 * 段落 (H3)
 * @returns ReactNode
 */
const H3 = ({ children }: Children): ReactNode => {
  return (
    <h3 className={styles.h3Tag}>
      <div className={styles.line} />
      <span className={styles.text}>{children}</span>
    </h3>
  )
}

export default H3
