import styles from "@/components/layout/sidebar/HeaderPC.module.css"

import type { ReactNode } from "react"

/**
 * PC用ヘッダー
 * @returns ReactNode
 */
const HeaderPC = (): ReactNode => {
  return (
    <div className={styles.headerPC}>
      {/* TODO: ロゴはSVGに置き換える */}
      <img height={60} src="/logo-full.png" width={283} />
    </div>
  )
}

export default HeaderPC
