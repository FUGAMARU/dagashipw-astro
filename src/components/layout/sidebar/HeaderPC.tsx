import styles from "@/components/layout/sidebar/HeaderPC.module.css"
import Link from "@/components/parts/common/Link"
import SvgLoader from "@/components/parts/svg/SvgLoader"
import { PAGE_PATH } from "@/constants/page"

import type { ReactNode } from "react"

/**
 * PC用ヘッダー
 * @returns ReactNode
 */
const HeaderPC = (): ReactNode => {
  return (
    <div className={styles.headerPC}>
      <Link href={PAGE_PATH.TOP}>
        <SvgLoader height={60} name="logoFullPC" width={297.28} />
      </Link>
    </div>
  )
}

export default HeaderPC
