import { useStore } from "@nanostores/react"
import { Fragment, useEffect } from "react"

import { DividerHorizontal } from "@/components/parts/common/DividerHorizontal"
import { SvgLoader } from "@/components/parts/svg/SvgLoader"
import styles from "@/components/templates/TableOfContents.module.css"
import { TableOfContentsItem } from "@/components/templates/TableOfContentsItem"
import { activeHeadingAnchorLinkAtom } from "@/stores/active-heading-anchor-link"
import { isTocHydrationCompleteAtom } from "@/stores/is-toc-hydration-complete"

import type { TableOfContentsData } from "@/types/table-of-contents"

/** Props */
type Props = {
  /** 目次データー */
  tableOfContentsData: TableOfContentsData
  /** 読了目安時間 (分) */
  minutesToRead: number
}

/** 目次 */
export const TableOfContents = ({ tableOfContentsData, minutesToRead }: Props) => {
  /** 記事のスクロールに反応して取得された最新の閲覧中セクションに対応する見出しアンカーリンク */
  const latestHeadingAnchorLink = useStore(activeHeadingAnchorLinkAtom)

  /** 閲覧中セクションに対応する見出しのアンカーリンク */
  const currentHeadingAnchorLink = latestHeadingAnchorLink ?? tableOfContentsData?.[0].h2.href
  // TODO: そもそも記事冒頭のh2より前のセクション閲覧中に最初のh2がアクティブ表示になっているのはおかしい気がする

  useEffect(() => {
    isTocHydrationCompleteAtom.set(true)
  })

  return (
    <div className={styles.tableOfContents}>
      <div className={styles.main}>
        {tableOfContentsData?.map((content, h2Index) => (
          <Fragment key={content.h2.href}>
            <TableOfContentsItem
              href={content.h2.href}
              isActive={currentHeadingAnchorLink === content.h2.href}
              itemNumber={`${h2Index + 1}`}
              title={content.h2.title}
            />
            {content.h2.h3?.map((h3, h3Index) => (
              <Fragment key={h3.href}>
                <div className={styles.headingH3}>
                  <TableOfContentsItem
                    href={h3.href}
                    isActive={currentHeadingAnchorLink === h3.href}
                    itemNumber={`${h2Index + 1}-${h3Index + 1}`}
                    title={h3.title}
                  />
                </div>
                {h3.h4?.map((h4, h4Index) => (
                  <div key={h4.href} className={styles.headingH4}>
                    <TableOfContentsItem
                      href={h4.href}
                      isActive={currentHeadingAnchorLink === h4.href}
                      itemNumber={`${h2Index + 1}-${h3Index + 1}-${h4Index + 1}`}
                      title={h4.title}
                    />
                  </div>
                ))}
              </Fragment>
            ))}
            {h2Index !== tableOfContentsData.length - 1 && <DividerHorizontal />}
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
