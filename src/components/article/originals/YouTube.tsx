import clsx from "clsx"
import { memo } from "react"

import styles from "@/components/article/originals/YouTube.module.css"

/** Props */
type Props = {
  /** 動画ID */
  videoId: string
  /** 中央寄せするかどうか */
  isCentered?: boolean
}

/** YouTube埋め込み用コンポーネント */
export const YouTube = memo(({ videoId, isCentered = false }: Props) => {
  return (
    <div className={clsx(styles.youTube, isCentered && styles.Centered)}>
      <iframe
        allowFullScreen
        className={styles.iframe}
        src={`https://www.youtube.com/embed/${videoId}`}
      />
    </div>
  )
})

YouTube.displayName = "YouTube"
