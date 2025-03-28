import { BackNumber } from "@/components/parts/BackNumber"
import { Image } from "@/components/parts/common/Image"
import { Tag } from "@/components/parts/Tag"
import { ArticleInfoBar } from "@/components/templates/ArticleInfoBar"
import styles from "@/components/templates/hero/HeroSP.module.css"

import type { HeroProps } from "@/components/templates/hero/Hero"

/** ブログ記事先頭に表示するHero (SP) */
export const HeroSP = ({
  thumbnailUrl,
  backNumber,
  title,
  createdAt,
  updatedAt,
  commentCount,
  tags
}: HeroProps) => {
  return (
    <div className={styles.heroSP}>
      <div className={styles.imageContainer}>
        <Image
          alt={title}
          borderRadius="0"
          cssHeight="auto"
          cssWidth="full"
          isEager
          isObjectFitCover
          isWide
          src={thumbnailUrl}
        />
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
