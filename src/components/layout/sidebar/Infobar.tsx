import styles from "@/components/layout/sidebar/Infobar.module.css"

import type { ReactNode } from "react"

/**
 * Infobar - 日付やIPv6 / IPv4の接続情報などを表示する
 * @returns ReactNode
 */
const Infobar = (): ReactNode => {
  return (
    <div className={styles.infobarContainer}>
      <div className={styles.sectionCalendar}>
        <p className={styles.year}>2024</p>
        <div className={styles.dateAndDay}>
          <span className={styles.date}>06.08</span>
          <span className={styles.day}>[土]</span>
        </div>
      </div>

      <div className={styles.sectionConnection}>
        <span>CONNECTED</span>
        <div className={styles.via}>
          <span>VIA</span>
          <div className={styles.type}>IPv6</div>
        </div>
      </div>
    </div>
  )
}

export default Infobar
