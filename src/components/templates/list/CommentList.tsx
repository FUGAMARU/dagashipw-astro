import { Comment } from "@/components/parts/Comment"
import styles from "@/components/templates/list/CommentList.module.css"
import { isValidArray } from "@/utils"

import type { ComponentProps } from "react"

/** コメントデーター */
type Comment = Omit<ComponentProps<typeof Comment>["commentInfo"], "commentNumber">

/** Props */
type Props = {
  /** コメント一覧 */
  comments: Array<
    Comment & {
      /** 返信一覧 */
      replies: Array<Comment>
    }
  >
}

/** コメント一覧表示用コンポーネント */
export const CommentList = ({ comments }: Props) => {
  return (
    <div>
      <div className={styles.commentList}>
        {comments.map((comment, commentIndex) => (
          <div key={comment.commentId}>
            <Comment
              commentInfo={{
                ...comment,
                commentNumber: String(comments.length - commentIndex)
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
                      commentNumber: `${comments.length - commentIndex}-${replyIndex + 1}`
                    }}
                    displayType="child"
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {comments.length >= 5 && (
        <button className={styles.showMore} type="button">
          TODO: コメントをもっと表示するボタン
        </button>
      )}
    </div>
  )
}
