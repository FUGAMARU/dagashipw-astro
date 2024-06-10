import { Fragment, type ReactNode } from "react"

import DividerHorizontal from "@/components/parts/common/DividerHorizontal"
import styles from "@/components/templates/TableOfContents.module.css"
import TableOfContentsItem from "@/components/templates/TableOfContentsItem"

type Props = {
  contents: Array<{
    h2: {
      title: string
      href: string
      h3?: Array<{
        title: string
        href: string
        h4?: Array<{
          title: string
          href: string
        }>
      }>
    }
  }>
  /** アクティブ表示にするアイテムのhref */
  activeItemHref: string
}

/**
 * 目次
 * @returns ReactNode
 */
const TableOfContents = ({ contents, activeItemHref }: Props): ReactNode => {
  return (
    <div className={styles.tableOfContents}>
      <div className={styles.main}>
        {contents.map((content, h2Index) => (
          <Fragment key={content.h2.title}>
            <TableOfContentsItem
              href={content.h2.href}
              isActive={activeItemHref === content.h2.href}
              itemNumber={`${h2Index + 1}`}
              title={content.h2.title}
            />
            {content.h2.h3?.map((h3, h3Index) => (
              <Fragment key={h3.title}>
                <div className={styles.headingH3}>
                  <TableOfContentsItem
                    href={h3.href}
                    isActive={activeItemHref === h3.href}
                    itemNumber={`${h2Index + 1}-${h3Index + 1}`}
                    title={h3.title}
                  />
                </div>
                {h3.h4?.map((h4, h4Index) => (
                  <div key={h4.title} className={styles.headingH4}>
                    <TableOfContentsItem
                      href={h4.href}
                      isActive={activeItemHref === h4.href}
                      itemNumber={`${h2Index + 1}-${h3Index + 1}-${h4Index + 1}`}
                      title={h4.title}
                    />
                  </div>
                ))}
              </Fragment>
            ))}
            {h2Index !== contents.length - 1 && <DividerHorizontal />}
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
