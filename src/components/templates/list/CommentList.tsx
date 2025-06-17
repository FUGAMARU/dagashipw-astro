import { useState } from "react"

import { Comment } from "@/components/parts/Comment"
import { Modal } from "@/components/parts/Modal"
import styles from "@/components/templates/list/CommentList.module.css"
import { CommentPostModal } from "@/components/templates/modal/CommentPostModal"
import { useCommentView } from "@/components/views/CommentView.hooks"
import { COMMENT_ELEMENT_ID_PREFIX } from "@/constants/element"
import { isValidArray } from "@/utils"

import type { ComponentProps } from "react"

/** コメントデーター */
type Comment = Omit<ComponentProps<typeof Comment>["commentInfo"], "commentNumber">

/** Props */
type Props = {
  /** 記事のURL ID */
  articleUrlId: string
  /** コメント一覧 */
  comments: Array<
    Comment & {
      /** 返信一覧 */
      replies: Array<Comment>
    }
  >
}

/** コメント一覧表示用コンポーネント */
export const CommentList = ({ articleUrlId, comments }: Props) => {
  const [replyTargetCommentId, setReplyTargetCommentId] = useState<string>()

  const {
    userNameValue,
    bodyValue,
    userNameErrorMessage,
    bodyErrorMessage,
    handleBodyChange,
    handleCommentPostModalClose,
    handleCommentPostModalOpen,
    handleSubmit,
    handleUserNameChange,
    isCommentPostModalOpen,
    isCommentPosting
  } = useCommentView(articleUrlId)

  /** コメント返信ボタンを押下した時の処理 */
  const handleReplyButtonClick = (commentId: string) => {
    setReplyTargetCommentId(commentId)
    handleCommentPostModalOpen()
  }

  return (
    <div>
      <div className={styles.commentList}>
        {comments.map((comment, commentIndex) => (
          <div key={comment.commentId} id={`${COMMENT_ELEMENT_ID_PREFIX}${comment.commentId}`}>
            <Comment
              commentInfo={{
                ...comment,
                commentNumber: String(comments.length - commentIndex)
              }}
              displayType="parent"
              hasReply={isValidArray(comment.replies)}
              onReplyButtonClick={handleReplyButtonClick}
            />

            {isValidArray(comment.replies) && (
              <div
                className={styles.replyList}
                id={`${COMMENT_ELEMENT_ID_PREFIX}${comment.commentId}`}
              >
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

      {/* {comments.length >= 5 && (
        <button className={styles.showMore} type="button">
          TODO: コメントをもっと表示するボタン
        </button>
      )} */}

      <Modal
        icon={{
          name: "commentWithPen",
          coloringMethod: "fill"
        }}
        isOpen={isCommentPostModalOpen}
        onClose={handleCommentPostModalClose}
        title="コメントをどうぞ"
      >
        <CommentPostModal
          bodyErrorMessage={bodyErrorMessage}
          bodyValue={bodyValue}
          isPosting={isCommentPosting}
          onBodyChange={handleBodyChange}
          onSubmit={(e, t) => handleSubmit(e, t, replyTargetCommentId)}
          onUserNameChange={handleUserNameChange}
          userNameErrorMessage={userNameErrorMessage}
          userNameValue={userNameValue}
        />
      </Modal>
    </div>
  )
}
