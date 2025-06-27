import styles from "@/components/article/originals/image/ImageTextRow.module.css"
import { Image } from "@/components/parts/common/Image"
import { generateImageSources } from "@/utils/image"

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
export const ImageTextRow = async ({ imageUrl, imageHeight, text }: Props) => {
  const imageSources = await generateImageSources(imageUrl)

  return (
    <div className={styles.imageTextRow}>
      <Image
        figureTagClassName={styles.image}
        height={imageHeight}
        imageSize="normal"
        sources={imageSources}
      />
      <p className={styles.text}>{text}</p>
    </div>
  )
}
