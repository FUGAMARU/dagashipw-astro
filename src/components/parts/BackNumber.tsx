import styles from "@/components/parts/BackNumber.module.css"

import type { ReactNode } from "react"

type Props = {
  /** バックナンバー */
  backNumber: number
}

/**
 * バックナンバー
 * @returns ReactNode
 */
const BackNumber = ({ backNumber }: Props): ReactNode => {
  return (
    <div className={styles.backNumber}>
      <span className={styles.text}>{`#${backNumber}`}</span>
    </div>
  )
}

export default BackNumber
