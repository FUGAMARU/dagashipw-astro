import clsx from "clsx"
import { useMemo, type ReactNode } from "react"

import styles from "@/components/parts/common/ItemNumber.module.css"

type Props = {
  /** 項番 */
  itemNumber: string
  /** アウトライン表示かどうか */
  isFilled?: boolean
}

/**
 * 項番
 * @returns ReactNode
 */
const ItemNumber = ({ itemNumber, isFilled = false }: Props): ReactNode => {
  /** ハイフンを含むかどうか */
  const includesHyphen = useMemo(() => itemNumber.includes("-"), [itemNumber])

  /** 1文字かどうか */
  const isOneCharacter = useMemo(() => itemNumber.length === 1, [itemNumber])

  /** 2文字かどうか */
  // eslint-disable-next-line no-magic-numbers
  const isTwoCharacters = useMemo(() => itemNumber.length === 2, [itemNumber])

  /** 3文字かどうか */
  // eslint-disable-next-line no-magic-numbers
  const isThreeCharacters = useMemo(() => itemNumber.length === 3, [itemNumber])

  return (
    <div
      className={clsx(
        styles.itemNumber,
        isOneCharacter && styles.OneCharacter,
        isTwoCharacters && styles.TwoCharacters,
        isThreeCharacters && !includesHyphen && styles.ThreeCharacters,
        isFilled && styles.Filled
      )}
    >
      {itemNumber}
    </div>
  )
}

export default ItemNumber
