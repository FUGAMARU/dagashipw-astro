import clsx from "clsx"

import styles from "@/components/parts/BackNumber.module.css"

import type { CalculatedArticle } from "@/types/api"

/** Props */
type Props = {
  /** 文字を少し左にずらすかどうか */
  isShiftLeft?: boolean
} & Pick<CalculatedArticle, "backNumber">

/** バックナンバー */
export const BackNumber = ({ backNumber, isShiftLeft = false }: Props) => {
  return (
    <div className={styles.backNumber}>
      <span className={clsx(styles.text, isShiftLeft && styles.ShiftLeft)}>{`#${backNumber}`}</span>
    </div>
  )
}
