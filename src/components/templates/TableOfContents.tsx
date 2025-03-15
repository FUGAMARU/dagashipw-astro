import { Fragment, useEffect, useState } from "react"
import { useSessionStorage } from "usehooks-ts"

import { DividerHorizontal } from "@/components/parts/common/DividerHorizontal"
import { SvgLoader } from "@/components/parts/svg/SvgLoader"
import styles from "@/components/templates/TableOfContents.module.css"
import { TableOfContentsItem } from "@/components/templates/TableOfContentsItem"
import {
  CUSTOM_EVENT_ACTIVE_HEADING_CHANGE,
  CUSTOM_EVENT_TABLE_OF_CONTENTS_HYDRATION_COMPLETE
} from "@/constants/event"
import {
  SESSION_STORAGE_MINUTES_TO_READ_KEY,
  SESSION_STORAGE_TABLE_OF_CONTENTS_KEY
} from "@/constants/value"
import { useIsSP } from "@/hooks/useIsSP"

import type { TableOfContentsData } from "@/types/table-of-contents"

/** 目次 */
export const TableOfContents = () => {
  /** 記事の読了目安時間 (分) */
  const [minutesToRead] = useSessionStorage<number>(SESSION_STORAGE_MINUTES_TO_READ_KEY, 0)

  /** 見出し一覧 (Inserter(SP)とSidebar(PC)でそれぞれ取得ロジックを書くのが無駄なのでここでsessionStorageから取得してしまう) */
  const [tableOfContents] = useSessionStorage<TableOfContentsData>(
    SESSION_STORAGE_TABLE_OF_CONTENTS_KEY,
    []
  )

  /** アクティブな見出しのID (sessionStorageからの取得ロジックを複数回用意するのが無駄なのでここでフックを呼んでしまう) */
  const [activeHeadingHref, setActiveHeadingHref] = useState("")

  const isSP = useIsSP()

  useEffect(() => {
    if (isSP) {
      return // SP表示の場合目次は記事冒頭固定なので何もしなくて良い
    }

    setActiveHeadingHref(tableOfContents[0].h2.href) // SPの場合は目次を太字にしたくないので早期returnした後のこのタイミングでsetActiveHeadingHrefする

    const hydrationCompleteEvent = new CustomEvent(
      CUSTOM_EVENT_TABLE_OF_CONTENTS_HYDRATION_COMPLETE
    )
    window.dispatchEvent(hydrationCompleteEvent)

    /** アクティブな見出しアイテムが変わったときの処理 */
    const handleActiveHeadingChange = (event: CustomEvent<string>) => {
      console.log("処理")
      setActiveHeadingHref(event.detail)
    }

    window.addEventListener(
      CUSTOM_EVENT_ACTIVE_HEADING_CHANGE,
      handleActiveHeadingChange as EventListener
    )

    return () => {
      window.removeEventListener(
        CUSTOM_EVENT_ACTIVE_HEADING_CHANGE,
        handleActiveHeadingChange as EventListener
      )
    }
  }, [isSP, tableOfContents])

  return (
    <div className={styles.tableOfContents}>
      <div className={styles.main}>
        {tableOfContents.map((content, h2Index) => (
          <Fragment key={content.h2.title}>
            <TableOfContentsItem
              href={content.h2.href}
              isActive={activeHeadingHref === content.h2.href}
              itemNumber={`${h2Index + 1}`}
              title={content.h2.title}
            />
            {content.h2.h3?.map((h3, h3Index) => (
              <Fragment key={h3.title}>
                <div className={styles.headingH3}>
                  <TableOfContentsItem
                    href={h3.href}
                    isActive={activeHeadingHref === h3.href}
                    itemNumber={`${h2Index + 1}-${h3Index + 1}`}
                    title={h3.title}
                  />
                </div>
                {h3.h4?.map((h4, h4Index) => (
                  <div key={h4.title} className={styles.headingH4}>
                    <TableOfContentsItem
                      href={h4.href}
                      isActive={activeHeadingHref === h4.href}
                      itemNumber={`${h2Index + 1}-${h3Index + 1}-${h4Index + 1}`}
                      title={h4.title}
                    />
                  </div>
                ))}
              </Fragment>
            ))}
            {h2Index !== tableOfContents.length - 1 && <DividerHorizontal />}
          </Fragment>
        ))}
      </div>

      <div className={styles.sectionTop}>
        <div className={styles.heading}>
          <div className={styles.inner} />
        </div>

        <div className={styles.minutes}>
          <SvgLoader className={styles.icon} height={10} name="clock" width={10} />
          <span className={styles.text}>この記事は{minutesToRead}分くらいで読めます</span>
        </div>
      </div>
    </div>
  )
}
