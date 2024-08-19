import styles from "@/components/article/standards/media/ArticleImage.module.css"
import Image from "@/components/templates/Image"

import type { ComponentProps, ReactNode } from "react"

type Props = Omit<ComponentProps<typeof Image>, "objectFitCover" | "noMargin">

/**
 * 記事中で表示する画像表示用コンポーネント
 * @param props Props
 * @returns ReactNode
 */
const ArticleImage = (props: Props): ReactNode => {
  return (
    <div className={styles.articleImage}>
      <Image noMargin {...props} />
    </div>
  )
}

export default ArticleImage
