import styles from "@/components/article/standards/heading/H3.module.css"
import { generateHeadingId } from "@/utils/formatter"

import type { Children } from "@/types/children"

/** 段落 (H3) */
export const H3 = ({ children }: Children) => {
  return (
    <h3 className={styles.h3Tag} id={generateHeadingId(children)}>
      <span className={styles.text}>{children}</span>
      <div className={styles.line}>
        <div className={styles.gradient} />
        <div className={styles.dark} />
      </div>
    </h3>
  )
}
