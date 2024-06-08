import Input from "@/components/input/Input"
import HeaderPC from "@/components/layout/sidebar/HeaderPC"
import styles from "@/components/layout/sidebar/index.module.css"
import Infobar from "@/components/layout/sidebar/Infobar"
import SidebarItemWithTitle from "@/components/layout/sidebar/SidebarItemWithTitle"

import type { ReactNode } from "react"

/**
 * サイドバー
 * @returns ReactNode
 */
const Sidebar = (): ReactNode => {
  return (
    <div className={styles.sidebarContainer}>
      <header className={styles.header}>
        <HeaderPC />
      </header>

      <div className={styles.main}>
        <Infobar />

        <SidebarItemWithTitle title="さがす">
          <Input hasSearchIcon placeholder="キーワードを入力…" />
        </SidebarItemWithTitle>
      </div>
    </div>
  )
}

export default Sidebar
