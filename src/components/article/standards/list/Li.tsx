import styles from "@/components/article/standards/list/Li.module.css"

import type { Children } from "@/types/children"
import type { ReactNode } from "react"

/**
 * liタグコンポーネント
 * @returns liタグ
 */
const Li = ({ children }: Children): ReactNode => {
  return <li className={styles.liTag}>{children}</li>
}

export default Li
