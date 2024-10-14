import styles from "@/components/article/standards/heading/H4.module.css"

import type { Children } from "@/types/children"

/** 段落 (H4) */
export const H4 = ({ children }: Children) => {
  return <h4 className={styles.h4Tag}>{children}</h4>
}
