import { BackNumber } from "@/components/parts/BackNumber"
import { Image } from "@/components/parts/common/Image"
import { Tag } from "@/components/parts/Tag"
import { ArticleInfoBar } from "@/components/templates/ArticleInfoBar"
import styles from "@/components/templates/hero/HeroPC.module.css"

import type { HeroProps } from "@/types/element"

/** Props */
type Props = HeroProps

/** PC版Heroコンポーネント */
export const HeroPC = ({
  articleUrlId,
  thumbnail,
  backNumber,
  title,
  createdAt,
  updatedAt,
  tags
}: Props) => {
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
          sources={thumbnail}
        />
      </div>

      <div className={styles.overlayContainer}>
        <div className={styles.upper} />
        <div className={styles.main}>
          <ArticleInfoBar
            articleUrlId={articleUrlId}
            createdAt={createdAt}
            isWhiteStyle
            updatedAt={updatedAt}
          />
          <h1 className={styles.title}>{title}</h1>

          <div className={styles.tags}>
            {tags.map(tagText => (
              <Tag key={tagText} text={tagText} />
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
