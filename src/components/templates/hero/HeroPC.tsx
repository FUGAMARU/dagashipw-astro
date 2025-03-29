import { BackNumber } from "@/components/parts/BackNumber"
import { Image } from "@/components/parts/common/Image"
import { Tag } from "@/components/parts/Tag"
import { ArticleInfoBar } from "@/components/templates/ArticleInfoBar"
import styles from "@/components/templates/hero/HeroPC.module.css"

import type { HeroProps } from "@/components/templates/hero/Hero"

/** ブログ記事先頭に表示するHero (PC) */
export const HeroPC = ({
  thumbnailUrl,
  backNumber,
  title,
  createdAt,
  updatedAt,
  commentCount,
  tags
}: HeroProps) => {
  return (
    <div className={styles.heroPC}>
      <div className={styles.imageContainer}>
        <Image
          alt={title}
          cssHeight="auto"
          cssWidth="full"
          isEager
          isObjectFitCover
          isWide
          src={thumbnailUrl}
        />
      </div>

      <div className={styles.overlayContainer}>
        <div className={styles.upper} />
        <div className={styles.main}>
          <ArticleInfoBar
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
