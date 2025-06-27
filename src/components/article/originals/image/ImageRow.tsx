import styles from "@/components/article/originals/image/ImageRow.module.css"
import { Image } from "@/components/parts/common/Image"
import { convertCommaSeparatedStringToArray } from "@/utils/formatter"
import { generateImageSources } from "@/utils/image"

/** Props */
type Props = {
  /** 画像一覧 (カンマ区切りで渡ってくる) */
  images: string
  /** gap */
  gap?: string
}

/** 画像を横並びに表示するコンポーネント */
export const ImageRow = async ({ images, gap = "16" }: Props) => {
  const imageUrlList = convertCommaSeparatedStringToArray(images)

  const imageSourcesList = await Promise.all(
    imageUrlList.map(imageUrl => generateImageSources(imageUrl))
  )

  return (
    <div className={styles.imageRow} style={{ gap: `${gap}px` }}>
      {imageUrlList.map((imageUrl, index) => (
        <Image key={imageUrl} alt="" imageSize="normal" sources={imageSourcesList[index]} />
      ))}
    </div>
  )
}
