import { Comment } from "@/components/parts/Comment"
import styles from "@/components/templates/CommentList.module.css"
import { isValidArray } from "@/utils"

import type { ComponentProps } from "react"

/** コメントデーター */
type Comment = Omit<ComponentProps<typeof Comment>["commentInfo"], "commentNumber">

/** Props */
type Props = {
  /** コメントリスト */
  commentList: Array<
    Comment & {
      /** 返信一覧 */
      replies: Array<Comment>
    }
  >
}

/** コメント一覧表示用コンポーネント */
export const CommentList = ({ commentList }: Props) => {
  return (
    <div>
      <div className={styles.commentList}>
        {commentList.map((comment, commentIndex) => (
          <div key={comment.commentId}>
            <Comment
              commentInfo={{
                ...comment,
                commentNumber: String(commentList.length - commentIndex)
              }}
              displayType="parent"
              hasReply={isValidArray(comment.replies)}
            />

            {isValidArray(comment.replies) && (
              <div className={styles.replyList}>
                {comment.replies.map((reply, replyIndex) => (
                  <Comment
                    key={reply.commentId}
                    commentInfo={{
                      ...reply,
                      commentNumber: `${commentList.length - commentIndex}-${replyIndex + 1}`
                    }}
                    displayType="child"
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {commentList.length >= 5 && (
        <button className={styles.showMore} type="button">
          TODO: コメントをもっと表示するボタン
        </button>
      )}
    </div>
  )
}
