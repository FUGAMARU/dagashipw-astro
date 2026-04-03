import styles from "@/components/layout/Footer.module.css"
import { Link } from "@/components/parts/common/Link"
import { LogoFullGrayScale } from "@/components/parts/svg/LogoFullGrayScale"
import { PAGE_PATH } from "@/constants/page"
import { convertDateStringFormat } from "@/utils/datetime"

/** フッター */
export const Footer = () => {
  return (
    <Link className={styles.footerComponent} href={PAGE_PATH.TOP}>
      <LogoFullGrayScale className={styles.logo} />
      <span className={styles.copyright}>
        &copy; 2016-{convertDateStringFormat(new Date().toISOString(), "yyyy")} FUGAMARU
      </span>
    </Link>
  )
}
