import styles from "@/components/article/originals/image/ImageRow.module.css"
import { Image } from "@/components/templates/Image"

/** Props */
type Props = {
  /** 画像一覧 (カンマ区切りで渡ってくる) */
  images: string
  /** gap */
  gap?: string
}

/** 画像を横並びに表示するコンポーネント */
export const ImageRow = ({ images, gap = "16" }: Props) => {
  const imageUrlList = images.replace(/\s+/g, "").split(",")

  return (
    <div className={styles.imageRow} style={{ gap: `${gap}px` }}>
      {imageUrlList.map(imageUrl => (
        <Image key={imageUrl} alt="" className={styles.image} src={imageUrl} />
      ))}
    </div>
  )
}
