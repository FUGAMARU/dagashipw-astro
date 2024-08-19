import styles from "@/components/article/standards/list/Ul.module.css"

import type { Children } from "@/types/children"
import type { ReactNode } from "react"

/**
 * ulタグコンポーネント
 * @returns ulタグ
 */
const Ul = ({ children }: Children): ReactNode => {
  return <ul className={styles.ulTag}>{children}</ul>
}

export default Ul
