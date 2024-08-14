import BackNumber from "@/components/parts/BackNumber"
import Tag from "@/components/parts/Tag"
import ArticleInfoBar from "@/components/templates/ArticleInfoBar"
import styles from "@/components/templates/hero/HeroSP.module.css"

import type { HeroProps } from "@/components/templates/hero/Hero"
import type { ReactNode } from "react"

/**
 * ブログ記事先頭に表示するHero (SP)
 * @returns ReactNode
 */
const HeroSP = ({
  thumbnailUrl,
  backNumber,
  title,
  createdAt,
  updatedAt,
  commentCount,
  tags
}: HeroProps): ReactNode => {
  return (
    <div className={styles.heroSP}>
      <div className={styles.imageContainer}>
        <img alt={title} className={styles.thumbnail} src={thumbnailUrl} />
        <div className={styles.overlay} />
        <div className={styles.number}>
          <BackNumber backNumber={backNumber} isShiftLeft />
        </div>
      </div>

      <div className={styles.articleDetails}>
        <div className={styles.upper}>
          <ArticleInfoBar
            commentCount={commentCount}
            createdAt={createdAt}
            isWhiteStyle
            updatedAt={updatedAt}
          />
        </div>

        <h1 className={styles.title}>{title}</h1>

        <div className={styles.tags}>
          {tags.map(tagText => (
            <Tag key={tagText} href={`/tags/${tagText}`} text={tagText} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HeroSP
