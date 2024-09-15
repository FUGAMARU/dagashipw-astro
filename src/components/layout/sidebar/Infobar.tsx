import { useMemo } from "react"

import styles from "@/components/layout/sidebar/Infobar.module.css"

/** 日付やIPv6 / IPv4の接続情報などを表示するコンポーネント */
export const Infobar = () => {
  const { year, month, day, dayOfWeek } = useMemo(() => {
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    const dayOfWeek = date.getDay()

    const weekday = ["日", "月", "火", "水", "木", "金", "土"]

    return {
      year,
      month,
      day,
      dayOfWeek: weekday[dayOfWeek]
    }
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
          <div className={styles.type}>IPv6</div>
        </div>
      </div>
    </div>
  )
}
