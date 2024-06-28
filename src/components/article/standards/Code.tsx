import styles from "@/components/article/standards/Code.module.css"

import type { Children } from "@/types/children"
import type { ReactNode } from "react"

/**
 * Codeタグコンポーネント
 * @returns ReactNode
 */
const Code = ({ children }: Children): ReactNode => {
  return <code className={styles.codeTag}>{children}</code>
}

export default Code
