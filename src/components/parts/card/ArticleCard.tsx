import clsx from "clsx"

import { BackNumber } from "@/components/parts/BackNumber"
import styles from "@/components/parts/card/ArticleCard.module.css"
import { Image } from "@/components/parts/common/Image"
import { SvgLoader } from "@/components/parts/svg/SvgLoader"
import { Tag } from "@/components/parts/Tag"
import { ArticleInfoBar } from "@/components/templates/ArticleInfoBar"
import { determineWhiteTextColor } from "@/utils/color"

import type { ArticleInfo } from "@/types/models"
import type { ComponentProps } from "react"

/** Props */
type Props = {
  /** サムネイルを即時読込するかどうか */
  isThumbnailEager?: ComponentProps<typeof Image>["isEager"]
} & ArticleInfo

/** 記事情報カード */
export const ArticleCard = ({
  isThumbnailEager = false,
  thumbnailUrl,
  themeColor,
  createdAt,
  updatedAt,
  commentCount,
  title,
  bodyBeginningParagraph,
  tags,
  backNumber
}: Props) => {
  const isHeaderTextColorWhite = determineWhiteTextColor(themeColor)

  return (
    <div className={styles.articleCard}>
      <div className={styles.thumbnail}>
        <Image
          cssHeight="full"
          cssWidth="full"
          figureTagClassName={styles.imageFigureTag}
          isEager={isThumbnailEager}
          isObjectFitCover
          src={thumbnailUrl}
        />
      </div>
      <div className={styles.index}>
        <BackNumber backNumber={backNumber} />
      </div>

      <div className={styles.main}>
        <div
          className={clsx(styles.header, isHeaderTextColorWhite && styles.WhiteText)}
          style={{ backgroundColor: themeColor }}
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
              // TODO: Link Area Delegationが普及したらそれに合わせたい (https://blog.sakupi01.com/dev/articles/proposal-link-area-delegation)
              <object key={tagText}>
                <Tag href={`/tags/${tagText}`} text={tagText} />
              </object>
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
