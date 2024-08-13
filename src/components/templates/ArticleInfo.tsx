import clsx from "clsx"

import SvgLoader from "@/components/parts/svg/SvgLoader"
import styles from "@/components/templates/ArticleInfo.module.css"
import useIsSP from "@/hooks/useIsSP"
import { isDefined } from "@/utils/isDefined"

import type { ReactNode } from "react"

type Props = {
  /** 作成日 */
  createdAt: string
  /** 更新日 */
  updatedAt?: string
  /** コメント数 */
  commentCount: number
  /** 文字色を白にするかどうか */
  isWhiteStyle?: boolean
  /** ボーダーを非表示にするかどうか */
  isBorderHidden?: boolean
}

/**
 * 記事情報
 * @returns ReactNode
 */
const ArticleInfo = ({
  createdAt,
  updatedAt,
  commentCount,
  isWhiteStyle = false,
  isBorderHidden = false
}: Props): ReactNode => {
  const isSP = useIsSP()

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
        <span>{commentCount}</span>
      </div>
    </div>
  )
}

export default ArticleInfo
