import clsx from "clsx"
import useSWR from "swr"

import { SvgLoader } from "@/components/parts/svg/SvgLoader"
import styles from "@/components/templates/ArticleInfoBar.module.css"
import { selfHostedFetcher } from "@/services/self-hosted-api"
import { isDefined, isValidString } from "@/utils"
import { convertDateStringFormat } from "@/utils/datetime"

import type { CalculatedArticle } from "@/types/api"

/** Props */
type Props = {
  /** 文字色を白にするかどうか */
  isWhiteStyle?: boolean
  /** ボーダーを非表示にするかどうか */
  isBorderHidden?: boolean
} & Pick<CalculatedArticle, "articleUrlId" | "createdAt" | "updatedAt">

/** 記事情報 */
export const ArticleInfoBar = ({
  articleUrlId,
  createdAt,
  updatedAt,
  isWhiteStyle = false,
  isBorderHidden = false
}: Props) => {
  const formattedCreatedAt = convertDateStringFormat(createdAt, "yyyy-MM-dd")
  const formattedUpdatedAt = isValidString(updatedAt)
    ? convertDateStringFormat(updatedAt, "yyyy-MM-dd")
    : undefined

  const { data: commentCount } = useSWR<number>(
    {
      apiFunction: "getArticleCommentCount",
      arg: articleUrlId
    },
    selfHostedFetcher
  )

  return (
    <div className={clsx(styles.articleInfo, isWhiteStyle && styles.WhiteStyle)}>
      <div
        className={clsx(
          styles.sectionCommonStyle,
          isBorderHidden && styles.NoBorder,
          styles.createdAt
        )}
      >
        <SvgLoader className={styles.iconSize} name="writingPen" />
        <span>{formattedCreatedAt}</span>
      </div>

      {isDefined(formattedUpdatedAt) && (
        <div
          className={clsx(
            styles.sectionCommonStyle,
            isBorderHidden && styles.NoBorder,
            styles.updatedAt
          )}
        >
          <SvgLoader className={clsx(styles.iconSize, styles.Large)} name="reverseClock" />
          <span>{formattedUpdatedAt}</span>
        </div>
      )}

      <div
        className={clsx(
          styles.sectionCommonStyle,
          isBorderHidden && styles.NoBorder,
          styles.commentCount
        )}
      >
        <SvgLoader className={styles.iconSize} name="commentWithPen" />
        <span>{isDefined(commentCount) ? commentCount : " "}</span>
      </div>
    </div>
  )
}
