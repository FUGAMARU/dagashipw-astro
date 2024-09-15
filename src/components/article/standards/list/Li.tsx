import styles from "@/components/article/standards/list/Li.module.css"

import type { Children } from "@/types/children"

/** liタグコンポーネント */
export const Li = ({ children }: Children) => {
  return <li className={styles.liTag}>{children}</li>
}
