import { Comment } from "@/components/parts/Comment"
import styles from "@/components/templates/CommentList.module.css"
import { isValidArray } from "@/utils"

import type { ComponentProps } from "react"

/** コメントデーター */
type Comment = Omit<ComponentProps<typeof Comment>["commentInfo"], "index"> & {
  /** コメントID */
  commentId: number
}

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
    <div className={styles.commentList}>
      {commentList.map((comment, commentIndex) => (
        <div key={comment.commentId}>
          <Comment
            commentInfo={{
              ...comment,
              index: String(commentList.length - commentIndex)
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
                    ...comment,
                    index: `${commentList.length - commentIndex}-${replyIndex + 1}`
                  }}
                  displayType="child"
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
