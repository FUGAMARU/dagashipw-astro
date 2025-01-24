import styles from "@/components/article/standards/media/ArticleImage.module.css"
import { Image } from "@/components/parts/common/Image"

import type { ComponentProps } from "react"

/** 記事中で表示する画像表示用コンポーネント */
export const ArticleImage = (props: Omit<ComponentProps<typeof Image>, "objectFitCover">) => {
  return (
    <div className={styles.articleImage}>
      <Image {...props} />
    </div>
  )
}
