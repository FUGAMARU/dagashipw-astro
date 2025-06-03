import clsx from "clsx"
import useSWR from "swr"

import { getInfoBarDateInfo } from "@/components/layout/sidebar/Infobar.helpers"
import styles from "@/components/layout/sidebar/Infobar.module.css"
import { AnimatedSkeleton } from "@/components/parts/common/AnimatedSkeleton"
import { selfHostedFetcher } from "@/services/self-hosted-api"
import { isDefined } from "@/utils"

import type { SidebarApiResponse } from "@/types/api"

/** 日付やIPv6 / IPv4の接続情報などを表示するコンポーネント */
export const Infobar = () => {
  const { data: sidebarInfo } = useSWR<SidebarApiResponse>(
    {
      apiFunction: "getSidebarInfo",
      arg: ""
    },
    selfHostedFetcher
  )

  const infobarDateInfo = getInfoBarDateInfo(sidebarInfo?.date)

  return (
    <div className={styles.infobarContainer}>
      {isDefined(infobarDateInfo) ? (
        <div className={styles.sectionCalendar}>
          <p className={styles.year}>{infobarDateInfo.year}</p>
          <div className={styles.dateAndDay}>
            <span className={styles.date}>{`${infobarDateInfo.month}.${infobarDateInfo.day}`}</span>
            <span className={styles.day}>[{infobarDateInfo.dayOfWeek}]</span>
          </div>
        </div>
      ) : (
        <AnimatedSkeleton height={36} width={120} />
      )}

      <div className={styles.sectionConnection}>
        <span>CONNECTED</span>
        <div className={styles.via}>
          <span>VIA</span>
          {isDefined(sidebarInfo?.isIPv4) ? (
            <div className={clsx(styles.type, sidebarInfo.isIPv4 && styles.IPv4)}>
              IPv{sidebarInfo.isIPv4 ? 4 : 6}
            </div>
          ) : (
            <AnimatedSkeleton height={16} width={31} />
          )}
        </div>
      </div>
    </div>
  )
}
