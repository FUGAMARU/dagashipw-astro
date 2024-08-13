import BackNumber from "@/components/parts/BackNumber"
import Tag from "@/components/parts/Tag"
import ArticleInfo from "@/components/templates/ArticleInfo"
import styles from "@/components/templates/hero/HeroPC.module.css"

import type { HeroProps } from "@/components/templates/hero/Hero"
import type { ReactNode } from "react"

/**
 * ブログ記事先頭に表示するHero (PC)
 * @returns ReactNode
 */
const HeroPC = ({
  thumbnailUrl,
  backNumber,
  title,
  createdAt,
  updatedAt,
  commentCount,
  tags
}: HeroProps): ReactNode => {
  return (
    <div className={styles.heroPC}>
      <div className={styles.imageContainer}>
        <img alt={title} className={styles.thumbnail} src={thumbnailUrl} />
      </div>

      <div className={styles.overlayContainer}>
        <div className={styles.upper} />
        <div className={styles.main}>
          <ArticleInfo
            commentCount={commentCount}
            createdAt={createdAt}
            isWhiteStyle
            updatedAt={updatedAt}
          />
          <h1 className={styles.title}>{title}</h1>

          <div className={styles.tags}>
            {tags.map(tagText => (
              <Tag key={tagText} href={`/tags/${tagText}`} text={tagText} />
            ))}
          </div>

          <div className={styles.number}>
            <BackNumber backNumber={backNumber} isShiftLeft />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroPC
