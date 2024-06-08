import styles from "@/components/layout/sidebar/SidebarItemWithTitle.module.css"

import type { ReactNode } from "react"

type Props = {
  /** タイトル */
  title: string
  /** 子要素 */
  children: ReactNode
}

/**
 * タイトル付きのサイドバーアイテム
 * @returns ReactNode
 */
const SidebarItemWithTitle = ({ title, children }: Props): ReactNode => {
  return (
    <div className={styles.sidebarItemWithTitle}>
      <span className={styles.title}>{title}</span>
      <div>{children}</div>
    </div>
  )
}

export default SidebarItemWithTitle
