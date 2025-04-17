import clsx from "clsx"
import useSWR from "swr"

import { SvgLoader } from "@/components/parts/svg/SvgLoader"
import styles from "@/components/templates/ArticleInfoBar.module.css"
import { useIsSP } from "@/hooks/useIsSP"
import { selfHostedFetcher } from "@/services/self-hosted-api"
import { isDefined } from "@/utils"

import type { ArticleInfo } from "@/types/models"

/** Props */
type Props = {
  /** 文字色を白にするかどうか */
  isWhiteStyle?: boolean
  /** ボーダーを非表示にするかどうか */
  isBorderHidden?: boolean
} & Pick<ArticleInfo, "articleUrlId" | "createdAt" | "updatedAt">

/** 記事情報 */
export const ArticleInfoBar = ({
  articleUrlId,
  createdAt,
  updatedAt,
  isWhiteStyle = false,
  isBorderHidden = false
}: Props) => {
  const isSP = useIsSP()

  const { data: commentCount } = useSWR<number>(
    `/proxy/comments/${articleUrlId}/count`,
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
        <SvgLoader height={isSP ? 12 : 16} name="writingPen" width={isSP ? 12 : 16} />
        <span>{createdAt}</span>
      </div>

      {isDefined(updatedAt) && (
        <div
          className={clsx(
            styles.sectionCommonStyle,
            isBorderHidden && styles.NoBorder,
            styles.updatedAt
          )}
        >
          <SvgLoader height={isSP ? 16 : 18} name="reverseClock" width={isSP ? 16 : 18} />
          <span>{updatedAt}</span>
        </div>
      )}

      <div
        className={clsx(
          styles.sectionCommonStyle,
          isBorderHidden && styles.NoBorder,
          styles.commentCount
        )}
      >
        <SvgLoader height={isSP ? 12 : 16} name="commentWithPen" width={isSP ? 12 : 16} />
        <span>{isDefined(commentCount) ? commentCount : " "}</span>
      </div>
    </div>
  )
}
