import styles from "@/components/layout/HeaderSP.module.css"
import Link from "@/components/parts/common/Link"
import SvgLoader from "@/components/parts/svg/SvgLoader"
import { PAGE_PATH } from "@/constants/page"

import type { ReactNode } from "react"

/**
 * SP用ヘッダー
 * @returns ReactNode
 */
const HeaderSP = (): ReactNode => {
  return (
    <div className={styles.headerSP}>
      <Link href={PAGE_PATH.TOP}>
        <SvgLoader height={40} name="logoFullSP" width={198.19} />
      </Link>
    </div>
  )
}

export default HeaderSP
