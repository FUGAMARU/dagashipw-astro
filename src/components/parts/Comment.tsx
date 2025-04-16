import styles from "@/components/parts/Comment.module.css"
import { ItemNumber } from "@/components/parts/common/ItemNumber"
import { SvgLoader } from "@/components/parts/svg/SvgLoader"

/** コメント情報 */
type Comment = {
  /** インデックス */
  index: string
  /** ユーザー名 */
  userName: string
  /** 投稿日時 */
  submittedAt: string
  /** 本文 */
  body: string
}

/** 親コメントのIF */
type ParentComment = {
  /** 表示タイプ */
  displayType: "parent"
  /** 返信の有無 */
  hasReply: boolean
}

/** 子コメントのIF */
type ChildComment = {
  /** 表示タイプ */
  displayType: "child"
}

/** Props */
type Props = (ParentComment | ChildComment) & {
  /** コメント情報 */
  commentInfo: Comment
}

/** コメント表示用コンポーネント */
export const Comment = ({ commentInfo, ...rest }: Props) => {
  /** 返信ボタンを押下した時の処理 */
  const handleReplyButtonClick = () => {
    alert("TODO: モーダル開く処理実装")
  }

  return (
    <div className={styles.commentComponent}>
      <div className={styles.header}>
        <ItemNumber isFilled={rest.displayType === "parent"} itemNumber={commentInfo.index} />
        <span className={styles.name}>{commentInfo.userName}</span>
        <span className={styles.datetime}>{commentInfo.submittedAt}</span>
      </div>

      <p className={styles.body}>{commentInfo.body}</p>

      {rest.displayType === "parent" && (
        <button className={styles.reply} onClick={handleReplyButtonClick} type="button">
          <SvgLoader className={styles.icon} height={16} name="turnBackArrow" width={16} />
          <span className={styles.label}>
            {rest.hasReply ? "このコメントに返信を追加する" : "このコメントに返信する"}
          </span>
        </button>
      )}
    </div>
  )
}
