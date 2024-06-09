import clsx from "clsx"
import { useMemo, type ReactNode } from "react"

import styles from "@/components/common/ItemNumber.module.css"

type Props = {
  /** 項番 */
  itemNumber: string
  /** アウトライン表示かどうか */
  isOutlined?: boolean
}

/**
 * 項番
 * @returns ReactNode
 */
const ItemNumber = ({ itemNumber, isOutlined = false }: Props): ReactNode => {
  /** 項番が1文字かどうか */
  const isSingleDigit = useMemo(() => itemNumber.length === 1, [itemNumber])

  return (
    <div
      className={clsx(
        styles.itemNumber,
        isSingleDigit && styles.SizeFixed,
        isOutlined && styles.Outlined
      )}
    >
      {itemNumber}
    </div>
  )
}

export default ItemNumber
