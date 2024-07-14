import styles from "@/components/article/standards/heading/H2.module.css"
import { generateHeadingId } from "@/utils/generateHeadingId"

import type { Children } from "@/types/children"
import type { ReactNode } from "react"

/**
 * 段落 (H2)
 * @returns ReactNode
 */
const H2 = ({ children }: Children): ReactNode => {
  return (
    <h2 className={styles.h2Tag} id={generateHeadingId(children)}>
      <div className={styles.line} />
      <span className={styles.text}>{children}</span>
    </h2>
  )
}

export default H2
