import styles from "@/components/article/standards/list/Ul.module.css"

import type { Children } from "@/types/children"

/** ulタグコンポーネント */
export const Ul = ({ children }: Children) => {
  return <ul className={styles.ulTag}>{children}</ul>
}
