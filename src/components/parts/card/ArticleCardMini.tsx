import clsx from "clsx"

import { getElapsedTimeString } from "@/components/parts/card/ArticleCardMini.helpers"
import styles from "@/components/parts/card/ArticleCardMini.module.css"
import { AnimatedSkeleton } from "@/components/parts/common/AnimatedSkeleton"
import { Image } from "@/components/parts/common/Image"
import { Link } from "@/components/parts/common/Link"
import { SvgLoader } from "@/components/parts/svg/SvgLoader"
import { isDefined } from "@/utils"
import { determineWhiteTextColor } from "@/utils/color"

import type { CalculatedArticle } from "@/types/api"

/** フォールバック表示時のProps */
type FallbackProps = {
  /** フォールバック表示するかどうか */
  isFallback: true
}

/** 通常表示時のProps */
type NormalProps = Pick<
  CalculatedArticle,
  "articleUrlId" | "createdAt" | "updatedAt" | "thumbnail" | "themeColor" | "title"
> & {
  /** フォールバック表示するかどうか */
  isFallback?: false
}

/** Props */
type Props = FallbackProps | NormalProps

/** 小さい記事カード */
export const ArticleCardMini = (props: Props) => {
  if (props.isFallback === true) {
    return (
      <div className={styles.articleCardMini}>
        <div className={styles.thumbnail}>
          <AnimatedSkeleton />
        </div>
        <div className={styles.main}>
          <div className={styles.upper}>
            <div className={styles.elapsed}>
              <AnimatedSkeleton height={18} width={56} />
            </div>
            <div className={styles.title}>
              <AnimatedSkeleton height={18} width={120} />
            </div>
          </div>
          <div className={styles.read}>
            <SvgLoader className={styles.icon} name="doubleRightArrow" />
            <span className={styles.text}>読んでみる</span>
          </div>
        </div>
      </div>
    )
  }

  const { themeColor, createdAt, updatedAt, articleUrlId, thumbnail, title } = props

  const isElapsedLabelColorWhite = determineWhiteTextColor(themeColor)
  const elapsedTimeString = getElapsedTimeString(
    isDefined(updatedAt) ? new Date(updatedAt) : new Date(createdAt)
  )

  return (
    <Link className={styles.articleCardMini} href={`/${articleUrlId}`}>
      <div className={styles.thumbnail}>
        <Image
          borderRadius="0"
          cssHeight="full"
          cssWidth="full"
          imageSize="smaller"
          isObjectFitCover
          isWide
          sources={thumbnail}
        />
      </div>

      <div className={styles.main}>
        <div className={styles.upper}>
          <div
            className={clsx(styles.elapsed, isElapsedLabelColorWhite && styles.WhiteStyle)}
            style={{ backgroundColor: themeColor }}
          >
            <SvgLoader className={styles.icon} name="clock" />
            <span className={styles.text}>{elapsedTimeString}</span>
          </div>
          <span className={styles.title}>{title}</span>
        </div>

        <div className={styles.read}>
          <SvgLoader className={styles.icon} name="doubleRightArrow" />
          <span className={styles.text}>読んでみる</span>
        </div>
      </div>
    </Link>
  )
}
