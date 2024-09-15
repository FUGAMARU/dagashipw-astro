import styles from "@/components/article/standards/Blockquote.module.css"

import type { Children } from "@/types/children"

/** Blockquoteタグコンポーネント */
export const Blockquote = ({ children }: Children) => {
  return (
    <blockquote className={styles.blockquoteTag}>
      <div className={styles.bar} />
      {children}
    </blockquote>
  )
}
