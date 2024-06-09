import styles from "@/components/parts/common/DividerHorizontal.module.css"

import type { ReactNode } from "react"

/**
 * 水平区切り線
 * @returns ReactNode
 */
const DividerHorizontal = (): ReactNode => {
  return <hr className={styles.dividerHorizontal} />
}

export default DividerHorizontal
