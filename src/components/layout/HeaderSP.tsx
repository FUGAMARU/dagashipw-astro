import Link from "@/components/common/Link"
import styles from "@/components/layout/HeaderSP.module.css"
import { PAGE_PATH } from "@/constants/page"

import type { ReactNode } from "react"

/**
 * SP用ヘッダー
 * @returns ReactNode
 */
const HeaderSP = (): ReactNode => {
  return (
    <div className={styles.headerSP}>
      {/* TODO: ロゴはSVGに置き換える */}
      <Link href={PAGE_PATH.TOP}>
        <img height={40} src="/logo-full.png" width={188} />
      </Link>
    </div>
  )
}

export default HeaderSP
