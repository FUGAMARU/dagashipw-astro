import styles from "@/components/article/standards/heading/H2.module.css"
import { generateHeadingId } from "@/utils/formatter"

import type { Children } from "@/types/children"

/** 段落 (H2) */
export const H2 = ({ children }: Children) => {
  return (
    <h2 className={styles.h2Tag} id={generateHeadingId(children)}>
      <div className={styles.line} />
      <span className={styles.text}>{children}</span>
    </h2>
  )
}
