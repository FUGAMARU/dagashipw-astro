import styles from "@/components/layout/HeaderSP.module.css"

import type { ReactNode } from "react"

/**
 * SP用ヘッダー
 * @returns ReactNode
 */
const HeaderSP = (): ReactNode => {
  return (
    <div className={styles.headerSP}>
      {/* TODO: ロゴはSVGに置き換える */}
      <img height={40} src="/logo-full.png" width={188} />
    </div>
  )
}

export default HeaderSP
