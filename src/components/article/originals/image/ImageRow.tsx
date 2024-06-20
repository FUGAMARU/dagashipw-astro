import styles from "@/components/article/originals/image/ImageRow.module.css"

import type { ReactNode } from "react"

type Props = {
  /** 左側の画像 */
  leftSideImageUrl: string
  /** 右側の画像 */
  rightSideImageUrl: string
  /** gap */
  gap: string
}

/**
 * 画像を横並びに表示するコンポーネント
 * @returns ReactNode
 */
const ImageRow = ({ leftSideImageUrl, rightSideImageUrl, gap }: Props): ReactNode => {
  return (
    <div className={styles.imageRow} style={{ gap: `${gap}px` }}>
      <img alt="" className={styles.image} src={leftSideImageUrl} />
      <img alt="" className={styles.image} src={rightSideImageUrl} />
    </div>
  )
}

export default ImageRow
