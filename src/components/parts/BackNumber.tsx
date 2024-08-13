import clsx from "clsx"

import styles from "@/components/parts/BackNumber.module.css"

import type { ReactNode } from "react"

type Props = {
  /** バックナンバー */
  backNumber: number
  /** 文字を少し左にずらすかどうか */
  isShiftLeft?: boolean
}

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
