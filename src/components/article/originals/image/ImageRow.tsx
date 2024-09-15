import styles from "@/components/article/originals/image/ImageRow.module.css"
import { Image } from "@/components/templates/Image"

/** Props */
type Props = {
  /** 左側の画像 */
  leftSideImageUrl: string
  /** 右側の画像 */
  rightSideImageUrl: string
  /** gap */
  gap?: string
}

/** 画像を横並びに表示するコンポーネント */
export const ImageRow = ({ leftSideImageUrl, rightSideImageUrl, gap = "16" }: Props) => {
  return (
    <div className={styles.imageRow} style={{ gap: `${gap}px` }}>
      <Image alt="" className={styles.image} src={leftSideImageUrl} />
      <Image alt="" className={styles.image} src={rightSideImageUrl} />
    </div>
  )
}
