import clsx from "clsx"

import { ItemNumber } from "@/components/parts/common/ItemNumber"
import { Link } from "@/components/parts/common/Link"
import styles from "@/components/templates/TableOfContentsItem.module.css"

import type { ComponentProps } from "react"

/** Props */
type Props = {
  /** タイトル */
  title: string
  /** リンク */
  href: string
  /** アクティブかどうか */
  isActive?: boolean
} & Pick<ComponentProps<typeof ItemNumber>, "itemNumber">

/** TableOfContentsに並ぶアイテム */
export const TableOfContentsItem = ({ title, href, isActive = false, itemNumber }: Props) => {
  return (
    <Link className={styles.tableOfContentsItem} href={href}>
      <ItemNumber isFilled={isActive} itemNumber={itemNumber} />
      <span className={clsx(styles.title, isActive && styles.Active)}>{title}</span>
    </Link>
  )
}
