import styles from "@/components/article/originals/image/ImageRow.module.css"
import { Image } from "@/components/parts/image/Image"
import { convertCommaSeparatedStringToArray } from "@/utils/formatter"

/** Props */
type Props = {
  /** 画像一覧 (カンマ区切りで渡ってくる) */
  images: string
  /** gap */
  gap?: string
}

/** 画像を横並びに表示するコンポーネント */
export const ImageRow = ({ images, gap = "16" }: Props) => {
  return (
    <div className={styles.imageRow} style={{ gap: `${gap}px` }}>
      {convertCommaSeparatedStringToArray(images).map(imageUrl => (
        <Image key={imageUrl} alt="" src={imageUrl} />
      ))}
    </div>
  )
}
