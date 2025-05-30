import styles from "@/components/article/standards/heading/H2.module.css"

import type { Children } from "@/types/children"

/** Props */
type Props = {
  /** ID */
  id: string
} & Children

/** 段落 (H2) */
export const H2 = ({ id, children }: Props) => {
  return (
    <h2 className={styles.h2Tag} id={id}>
      <div className={styles.line} />
      <span className={styles.text}>{children}</span>
    </h2>
  )
}
