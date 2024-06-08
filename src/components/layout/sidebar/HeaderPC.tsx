import Link from "@/components/common/Link"
import styles from "@/components/layout/sidebar/HeaderPC.module.css"
import { PAGE_PATH } from "@/constants/page"

import type { ReactNode } from "react"

/**
 * PC用ヘッダー
 * @returns ReactNode
 */
const HeaderPC = (): ReactNode => {
  return (
    <div className={styles.headerPC}>
      {/* TODO: ロゴはSVGに置き換える */}
      <Link href={PAGE_PATH.TOP}>
        <img height={60} src="/logo-full.png" width={283} />
      </Link>
    </div>
  )
}

export default HeaderPC
