import clsx from "clsx"
import { useEffect, useState } from "react"

import { getInfoBarDateInfo } from "@/components/layout/sidebar/Infobar.helpers"
import styles from "@/components/layout/sidebar/Infobar.module.css"
import { checkIsIPv4 } from "@/services/self-hosted-api"

/** 日付やIPv6 / IPv4の接続情報などを表示するコンポーネント */
export const Infobar = () => {
  const { year, month, day, dayOfWeek } = getInfoBarDateInfo(new Date())

  const [isIPv4, setIsIPv4] = useState(false)

  useEffect(() => {
    checkIsIPv4().then(setIsIPv4)
  }, [])

  return (
    <div className={styles.infobarContainer}>
      <div className={styles.sectionCalendar}>
        <p className={styles.year}>{year}</p>
        <div className={styles.dateAndDay}>
          <span className={styles.date}>{`${month}.${day}`}</span>
          <span className={styles.day}>[{dayOfWeek}]</span>
        </div>
      </div>

      <div className={styles.sectionConnection}>
        <span>CONNECTED</span>
        <div className={styles.via}>
          <span>VIA</span>
          <div className={clsx(styles.type, isIPv4 && styles.IPv4)}>IPv{isIPv4 ? 4 : 6}</div>
        </div>
      </div>
    </div>
  )
}
