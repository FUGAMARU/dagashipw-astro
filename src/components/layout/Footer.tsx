import styles from "@/components/layout/Footer.module.css"
import { LogoFullGrayScale } from "@/components/parts/svg/LogoFullGrayScale"
import { formatDateToString } from "@/utils/datetime"

/** フッター */
export const Footer = () => {
  return (
    <div className={styles.footerComponent}>
      <LogoFullGrayScale className={styles.logo} />
      <span className={styles.copyright}>
        &copy; 2016-{formatDateToString(new Date(), "yyyy")} FUGAMARU
      </span>
    </div>
  )
}
