import clsx from "clsx"
import { useMemo } from "react"

import { BackNumber } from "@/components/parts/BackNumber"
import styles from "@/components/parts/card/ArticleCard.module.css"
import { Image } from "@/components/parts/common/Image"
import { SvgLoader } from "@/components/parts/svg/SvgLoader"
import { Tag } from "@/components/parts/Tag"
import { ArticleInfoBar } from "@/components/templates/ArticleInfoBar"
import { determineWhiteTextColor } from "@/utils/color"

import type { ArticleInfo } from "@/types/article"

/** 記事情報カード (トップページで使う) */
export const ArticleCard = ({
  thumbnailUrl,
  dominantColorCode,
  createdAt,
  updatedAt,
  commentCount,
  title,
  bodyBeginningParagraph,
  tags,
  backNumber
}: ArticleInfo) => {
  const isHeaderTextColorWhite = useMemo(
    () => determineWhiteTextColor(dominantColorCode),
    [dominantColorCode]
  )

  return (
    <div className={styles.articleCard}>
      <div className={styles.thumbnail}>
        <Image
          cssHeight="full"
          cssWidth="full"
          figureTagClassName={styles.imageFigureTag}
          objectFitCover
          src={thumbnailUrl}
        />
      </div>
      <div className={styles.index}>
        <BackNumber backNumber={backNumber} />
      </div>

      <div className={styles.main}>
        <div
          className={clsx(styles.header, isHeaderTextColorWhite && styles.WhiteText)}
          style={{ backgroundColor: dominantColorCode }}
        >
          <ArticleInfoBar
            commentCount={commentCount}
            createdAt={createdAt}
            isBorderHidden
            isWhiteStyle={isHeaderTextColorWhite}
            updatedAt={updatedAt}
          />
        </div>

        <div className={styles.details}>
          <span className={styles.title}>{title}</span>
          <span className={styles.body}>{bodyBeginningParagraph}</span>
          <div className={styles.tags}>
            {tags.map(tagText => (
              <Tag key={tagText} href={`/tags/${tagText}`} text={tagText} />
            ))}
          </div>
        </div>

        <div className={styles.link}>
          <div className={styles.read}>
            <SvgLoader height={18} name="doubleRightArrow" width={18} />
            <span className={styles.text}>読んでみる</span>
          </div>
        </div>
      </div>
    </div>
  )
}
