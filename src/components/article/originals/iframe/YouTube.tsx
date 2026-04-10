import { memo } from "react"

import styles from "@/components/article/originals/iframe/YouTube.module.css"

/** Props */
type Props = {
  /** 動画ID */
  videoId: string
}

/** YouTube埋め込み用コンポーネント */
export const YouTube = memo(({ videoId }: Props) => {
  return (
    <div className={styles.youTube}>
      <iframe
        allowFullScreen
        className={styles.iframe}
        src={`https://www.youtube.com/embed/${videoId}`}
      />
    </div>
  )
})

YouTube.displayName = "YouTube"
