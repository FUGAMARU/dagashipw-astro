import styles from "@/components/article/standards/media/ArticleImage.module.css"
import { Image } from "@/components/templates/Image"

import type { ComponentProps } from "react"

/** Props */
type Props = Omit<ComponentProps<typeof Image>, "objectFitCover">

/** 記事中で表示する画像表示用コンポーネント */
export const ArticleImage = (props: Props) => {
  return (
    <div className={styles.articleImage}>
      <Image {...props} />
    </div>
  )
}
