import clsx from "clsx"

import styles from "@/components/parts/BackNumber.module.css"

import type { ArticleInfo } from "@/types/article"
import type { ReactNode } from "react"

type Props = {
  /** 文字を少し左にずらすかどうか */
  isShiftLeft?: boolean
} & Pick<ArticleInfo, "backNumber">

/**
 * バックナンバー
 * @returns ReactNode
 */
const BackNumber = ({ backNumber, isShiftLeft = false }: Props): ReactNode => {
  return (
    <div className={styles.backNumber}>
      <span className={clsx(styles.text, isShiftLeft && styles.ShiftLeft)}>{`#${backNumber}`}</span>
    </div>
  )
}

export default BackNumber
