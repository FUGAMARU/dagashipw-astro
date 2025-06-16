import styles from "@/components/parts/Comment.module.css"
import { ItemNumber } from "@/components/parts/common/ItemNumber"
import { SvgLoader } from "@/components/parts/svg/SvgLoader"

import type { CommentInfo } from "@/types/models"

/** 親コメントのIF */
type ParentComment = {
  /** 表示タイプ */
  displayType: "parent"
  /** 返信の有無 */
  hasReply: boolean
  /** 返信ボタンを押下した時の処理 */
  onReplyButtonClick: (commentId: string) => void
}

/** 子コメントのIF */
type ChildComment = {
  /** 表示タイプ */
  displayType: "child"
}

/** Props */
type Props = (ParentComment | ChildComment) & {
  /** コメント情報 */
  commentInfo: Omit<CommentInfo, "replies"> & {
    /** コメント番号 */
    commentNumber: string
  }
}

/** コメント表示用コンポーネント */
export const Comment = ({ commentInfo, ...rest }: Props) => {
  const handleReplyButtonClick = rest.displayType === "parent" ? rest.onReplyButtonClick : undefined

  return (
    <div className={styles.commentComponent}>
      <div className={styles.header}>
        <ItemNumber
          isFilled={rest.displayType === "parent"}
          itemNumber={commentInfo.commentNumber}
        />
        <div className={styles.name}>
          <span className={styles.text}>{commentInfo.userName}</span>
          {commentInfo.isAdministratorComment && (
            <SvgLoader className={styles.verified} name="verified" />
          )}
        </div>
        <span className={styles.datetime}>{commentInfo.submittedAt}</span>
      </div>

      <p className={styles.body}>{commentInfo.body}</p>

      {rest.displayType === "parent" && (
        <button
          className={styles.reply}
          onClick={() => handleReplyButtonClick?.(commentInfo.commentId)}
          type="button"
        >
          <SvgLoader className={styles.icon} name="turnBackArrow" />
          <span className={styles.label}>
            {rest.hasReply ? "このコメントに返信を追加する" : "このコメントに返信する"}
          </span>
        </button>
      )}
    </div>
  )
}
