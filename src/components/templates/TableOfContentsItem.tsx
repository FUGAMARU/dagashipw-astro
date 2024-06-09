import clsx from "clsx"

import ItemNumber from "@/components/parts/common/ItemNumber"
import Link from "@/components/parts/common/Link"
import styles from "@/components/templates/TableOfContentsItem.module.css"

import type { ComponentProps, ReactNode } from "react"

type Props = {
  /** タイトル */
  title: string
  /** リンク */
  href: string
  /** アクティブかどうか */
  isActive?: boolean
} & Pick<ComponentProps<typeof ItemNumber>, "itemNumber">

/**
 * TableOfContentsに並ぶアイテム
 * @returns ReactNode
 */
const TableOfContentsItem = ({ title, href, isActive = false, itemNumber }: Props): ReactNode => {
  return (
    <Link href={href}>
      <div className={styles.tableOfContentsItem}>
        <ItemNumber isFilled={isActive} itemNumber={itemNumber} />
        <span className={clsx(styles.title, isActive && styles.Active)}>{title}</span>
      </div>
    </Link>
  )
}

export default TableOfContentsItem
