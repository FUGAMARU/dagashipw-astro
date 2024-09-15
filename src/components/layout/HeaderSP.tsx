import styles from "@/components/layout/HeaderSP.module.css"
import { Link } from "@/components/parts/common/Link"
import { LogoLoader } from "@/components/parts/svg/LogoLoader"
import { PAGE_PATH } from "@/constants/page"

/** SP用ヘッダー */
export const HeaderSP = () => {
  return (
    <div className={styles.headerSP}>
      <Link href={PAGE_PATH.TOP}>
        <LogoLoader height={40} width={198.19} />
      </Link>
    </div>
  )
}
