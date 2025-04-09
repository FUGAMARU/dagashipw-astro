import clsx from "clsx"

import styles from "@/components/parts/common/ItemNumber.module.css"

/** Props */
type Props = {
  /** 項番 */
  itemNumber: string
  /** アウトライン表示かどうか */
  isFilled?: boolean
}

/** 項番 */
export const ItemNumber = ({ itemNumber, isFilled = false }: Props) => {
  /** ハイフンを含むかどうか */
  const isHyphenIncluded = itemNumber.includes("-")

  /** 1文字かどうか */
  const isOneCharacter = itemNumber.length === 1

  /** 2文字かどうか */
  const isTwoCharacters = itemNumber.length === 2

  /** 3文字かどうか */
  const isThreeCharacters = itemNumber.length === 3

  return (
    <div
      className={clsx(styles.itemNumber, {
        [styles.OneCharacter]: isOneCharacter,
        [styles.TwoCharacters]: isTwoCharacters,
        [styles.ThreeCharacters]: isThreeCharacters && !isHyphenIncluded,
        [styles.Filled]: isFilled
      })}
    >
      {itemNumber}
    </div>
  )
}
