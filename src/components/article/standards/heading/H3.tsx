import styles from "@/components/article/standards/heading/H3.module.css"

import type { Children } from "@/types/children"

/** Props */
type Props = {
  /** ID */
  id: string
} & Children

/** 段落 (H3) */
export const H3 = ({ id, children }: Props) => {
  return (
    <h3 className={styles.h3Tag} id={id}>
      <span className={styles.text}>{children}</span>
      <div className={styles.line}>
        <div className={styles.gradient} />
        <div className={styles.dark} />
      </div>
    </h3>
  )
}
