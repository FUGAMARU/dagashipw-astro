import styles from "@/components/layout/sidebar/HeaderPC.module.css"
import { Link } from "@/components/parts/common/Link"
import { LogoLoader } from "@/components/parts/svg/LogoLoader"
import { PAGE_PATH } from "@/constants/page"

/** PC用ヘッダー */
export const HeaderPC = () => {
  return (
    <div className={styles.headerPC}>
      <Link href={PAGE_PATH.TOP}>
        <LogoLoader height={60} width={297.28} />
      </Link>
    </div>
  )
}
