import styles from "@/components/article/originals/image/ImageTextRow.module.css"
import Image from "@/components/templates/Image"

import type { ReactNode } from "react"

type Props = {
  /** 画像URL */
  imageUrl: string
  /** 画像の高さ */
  imageHeight?: string
  /** テキスト */
  text: string
}

/**
 * 画像をテキストを横並びに表示するコンポーネント (SP表示では縦表示)
 * @returns ReactNode
 */
const ImageTextRow = ({ imageUrl, imageHeight, text }: Props): ReactNode => {
  return (
    <div className={styles.imageTextRow}>
      <Image className={styles.image} height={imageHeight} src={imageUrl} />
      <p className={styles.text}>{text}</p>
    </div>
  )
}

export default ImageTextRow
