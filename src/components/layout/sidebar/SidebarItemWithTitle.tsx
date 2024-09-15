import styles from "@/components/layout/sidebar/SidebarItemWithTitle.module.css"

import type { ReactNode } from "react"

/** Props */
type Props = {
  /** タイトル */
  title: string
  /** 子要素 */
  children: ReactNode
}

/** タイトル付きのサイドバーアイテム */
export const SidebarItemWithTitle = ({ title, children }: Props) => {
  return (
    <div className={styles.sidebarItemWithTitle}>
      <span className={styles.title}>{title}</span>
      <div>{children}</div>
    </div>
  )
}
