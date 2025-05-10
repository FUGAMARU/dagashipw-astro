import clsx from "clsx"

import { getElapsedTimeString } from "@/components/parts/card/ArticleCardMini.helpers"
import styles from "@/components/parts/card/ArticleCardMini.module.css"
import { Link } from "@/components/parts/common/Link"
import { Image } from "@/components/parts/common/Image"
import { SvgLoader } from "@/components/parts/svg/SvgLoader"
import { isDefined } from "@/utils"
import { determineWhiteTextColor } from "@/utils/color"

import type { ArticleInfo } from "@/types/models"

/** Props */
type Props = Pick<
  ArticleInfo,
  "articleUrlId" | "createdAt" | "updatedAt" | "thumbnailUrl" | "themeColor" | "title"
>

/** 小さい記事カード */
export const ArticleCardMini = ({
  articleUrlId,
  createdAt,
  updatedAt,
  thumbnailUrl,
  themeColor,
  title
}: Props) => {
  const isElapsedLabelColorWhite = determineWhiteTextColor(themeColor)
  const elapsedTimeString = getElapsedTimeString(
    isDefined(updatedAt) ? new Date(updatedAt) : new Date(createdAt)
  )

  return (
    <Link className={styles.articleCardMini} href={`/${articleUrlId}`}>
      <div className={styles.thumbnail}>
        <Image
          borderRadius="0"
          cssHeight="auto"
          cssWidth="full"
          figureTagClassName={styles.figure}
          isObjectFitCover
          src={thumbnailUrl}
        />
      </div>

      <div className={styles.main}>
        <div className={styles.upper}>
          <div
            className={clsx(styles.elapsed, isElapsedLabelColorWhite && styles.WhiteStyle)}
            style={{ backgroundColor: themeColor }}
          >
            <SvgLoader height={10} name="clock" width={10} />
            <span className={styles.text}>{elapsedTimeString}</span>
          </div>
          <span className={styles.title}>{title}</span>
        </div>

        <div className={styles.read}>
          <SvgLoader height={14} name="doubleRightArrow" width={14} />
          <span className={styles.text}>読んでみる</span>
        </div>
      </div>
    </Link>
  )
}
