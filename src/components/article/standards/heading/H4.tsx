import styles from "@/components/article/standards/heading/H4.module.css"

import type { Children } from "@/types/children"

/** Props */
type Props = {
  /** ID */
  id: string
} & Children

/** 段落 (H4) */
export const H4 = ({ id, children }: Props) => {
  return (
    <h4 className={styles.h4Tag} id={id}>
      {children}
    </h4>
  )
}
