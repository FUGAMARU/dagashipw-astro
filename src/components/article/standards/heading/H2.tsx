import styles from "@/components/article/standards/heading/H2.module.css"

import type { Children } from "@/types/children"
import type { ReactNode } from "react"

/**
 * 段落 (H2)
 * @returns ReactNode
 */
const H2 = ({ children }: Children): ReactNode => {
  return (
    <h2 className={styles.h2Tag}>
      <span className={styles.text}>{children}</span>
      <div className={styles.line} />
    </h2>
  )
}

export default H2