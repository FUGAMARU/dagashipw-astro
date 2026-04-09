import styles from "@/components/article/originals/image/ImageTextRow.module.css"
import { Image } from "@/components/parts/common/Image"
import { isValidString } from "@/utils"
import { unescapeNewlines } from "@/utils/formatter"
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
export const ImageTextRow = ({ imageUrl, imageHeight, text }: Props) => {
  const imageSources = generateImageSources(imageUrl)
  const hasImageHeight = isValidString(imageHeight)
  const parsedImageMaxHeight = Number(imageHeight)
  const imageMaxHeight = Number.isNaN(parsedImageMaxHeight) ? imageHeight : parsedImageMaxHeight
  const normalizedText = unescapeNewlines(text)

  return (
    <div className={styles.imageTextRow}>
      <Image
        imageSize="normal"
        imgTagClassName={hasImageHeight ? styles.img : undefined}
        isContain
        rootTagClassName={styles.figure}
        sources={imageSources}
        style={
          hasImageHeight
            ? {
                maxHeight: imageMaxHeight
              }
            : undefined
        }
      />
      <p className={styles.text}>{normalizedText}</p>
    </div>
  )
}
