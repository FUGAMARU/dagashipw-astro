import { Fragment, useEffect, useState, type ReactNode } from "react"
import { useSessionStorage } from "usehooks-ts"

import DividerHorizontal from "@/components/parts/common/DividerHorizontal"
import styles from "@/components/templates/TableOfContents.module.css"
import TableOfContentsItem from "@/components/templates/TableOfContentsItem"
import { CUSTOM_EVENT_ACTIVE_HEADING_CHANGE } from "@/constants/event"
import { SESSION_STORAGE_TABLE_OF_CONTENTS_KEY } from "@/constants/value"

import type { TableOfContentsData } from "@/types/table-of-contents"

/**
 * 目次
 * @returns ReactNode
 */
const TableOfContents = (): ReactNode => {
  /** 見出し一覧 (Inserter(SP)とSidebar(PC)でそれぞれ取得ロジックを書くのが無駄なのでここでsessionStorageから取得してしまう) */
  const [tableOfContents] = useSessionStorage<TableOfContentsData>(
    SESSION_STORAGE_TABLE_OF_CONTENTS_KEY,
    []
  )

  /** アクティブな見出しのID (sessionStorageからの取得ロジックを複数回用意するのが無駄なのでここでフックを呼んでしまう) */
  const [activeHeadingHref, setActiveHeadingHref] = useState(tableOfContents[0].h2.href ?? "#")

  useEffect(() => {
    const handleStateChange = (event: CustomEvent<string>): void => {
      setActiveHeadingHref(event.detail)
    }

    window.addEventListener(CUSTOM_EVENT_ACTIVE_HEADING_CHANGE, handleStateChange as EventListener)

    return (): void => {
      window.removeEventListener(
        CUSTOM_EVENT_ACTIVE_HEADING_CHANGE,
        handleStateChange as EventListener
      )
    }
  }, [])

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

      <div className={styles.headingWrapper}>
        <div className={styles.heading} />
      </div>
    </div>
  )
}

export default TableOfContents
