import styles from "@/components/article/originals/image/ImageTextRow.module.css"
import { Image } from "@/components/parts/image/Image"

/** Props */
type Props = {
  /** 画像URL */
  imageUrl: string
  /** 画像の高さ */
  imageHeight?: string
  /** テキスト */
  text: string
}

/** 画像をテキストを横並びに表示するコンポーネント (SP表示では縦表示) */
export const ImageTextRow = ({ imageUrl, imageHeight, text }: Props) => {
  return (
    <div className={styles.imageTextRow}>
      <Image figureTagClassName={styles.image} height={imageHeight} src={imageUrl} />
      <p className={styles.text}>{text}</p>
    </div>
  )
}
