import { clsx } from "clsx"

import SvgLoader from "@/components/parts/svg/SvgLoader"
import styles from "@/components/templates/ArticleInfo.module.css"

import type { ReactNode } from "react"

type Props = {
  /** 作成日 */
  createdAt: string
  /** 更新日 */
  updatedAt: string
  /** コメント数 */
  commentCount: number
  /** 文字色を白にするかどうか */
  isWhiteStyle?: boolean
}

/**
 * 記事情報
 * @returns ReactNode
 */
const ArticleInfo = ({
  createdAt,
  updatedAt,
  commentCount,
  isWhiteStyle = false
}: Props): ReactNode => {
  return (
    <div className={clsx(styles.articleInfo, isWhiteStyle && styles.WhiteStyle)}>
      <div className={clsx(styles.sectionCommonStyle, styles.createdAt)}>
        <span className={styles.spIcon}>
          <SvgLoader height={12} name="writingPen" width={12} />
        </span>
        <span className={styles.pcIcon}>
          <SvgLoader height={16} name="writingPen" width={16} />
        </span>
        <span>{createdAt}</span>
      </div>

      <div className={clsx(styles.sectionCommonStyle, styles.updatedAt)}>
        <span className={styles.spIcon}>
          <SvgLoader height={16} name="reverseClock" width={16} />
        </span>
        <span className={styles.pcIcon}>
          <SvgLoader height={18} name="reverseClock" width={18} />
        </span>
        <span>{updatedAt}</span>
      </div>

      <div className={clsx(styles.sectionCommonStyle, styles.commentCount)}>
        <span className={styles.spIcon}>
          <SvgLoader height={12} name="commentWithPen" width={12} />
        </span>
        <span className={styles.pcIcon}>
          <SvgLoader height={16} name="commentWithPen" width={16} />
        </span>
        <span>{commentCount}</span>
      </div>
    </div>
  )
}

export default ArticleInfo
