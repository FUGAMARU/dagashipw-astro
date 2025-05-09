import styles from "@/components/article/originals/image/ImageTextRow.module.css"
import { ImageCore } from "@/components/parts/image/ImageCore"

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
      <ImageCore figureTagClassName={styles.image} height={imageHeight} src={imageUrl} />
      <p className={styles.text}>{text}</p>
    </div>
  )
}
