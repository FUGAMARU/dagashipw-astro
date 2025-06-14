import type { Children } from "@/types/children"

import styles from "@/components/parts/common/ResponsiveContainer.module.css"

/** Props */
type Props = {
  /** PC表示かどうか */
  isPC?: boolean
} & Children

/** レスポンシブ対応用コンテナコンポーネント */
export const ResponsiveContainer = ({ isPC = false, children }: Props) => {
  if (isPC) {
    return <div className={styles.pcContainer}>{children}</div>
  }

  return <div className={styles.spContainer}>{children}</div>
}
