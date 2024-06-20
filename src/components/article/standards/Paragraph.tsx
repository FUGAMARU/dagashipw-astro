import styles from "@/components/article/standards/Paragraph.module.css"

import type { Children } from "@/types/children"
import type { ReactNode } from "react"

/**
 * 段落
 * @returns ReactNode
 */
const Paragraph = ({ children }: Children): ReactNode => {
  return <p className={styles.paragraphTag}>{children}</p>
}

export default Paragraph
