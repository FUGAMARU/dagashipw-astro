import styles from "@/components/article/standards/heading/H3.module.css"
import { generateHeadingId } from "@/utils/generateHeadingId"

import type { Children } from "@/types/children"
import type { ReactNode } from "react"

/**
 * 段落 (H3)
 * @returns ReactNode
 */
const H3 = ({ children }: Children): ReactNode => {
  return (
    <h3 className={styles.h3Tag} id={generateHeadingId(children)}>
      <span className={styles.text}>{children}</span>
      <div className={styles.line} />
    </h3>
  )
}

export default H3
