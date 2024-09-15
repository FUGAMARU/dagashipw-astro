import styles from "@/components/article/standards/Table.module.css"

import type { Children } from "@/types/children"

/**
 * Tableタグコンポーネント
 */
export const Table = ({ children }: Children) => {
  return (
    <div className={styles.tableTag}>
      <table className={styles.main}>{children}</table>
    </div>
  )
}
