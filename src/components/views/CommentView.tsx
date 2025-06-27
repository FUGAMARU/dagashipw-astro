import { ResponsiveContainer } from "@/components/parts/common/ResponsiveContainer"
import { CommonViewContainer } from "@/components/parts/CommonViewContainer"
import { Modal } from "@/components/parts/Modal"
import { CommentPostButton } from "@/components/templates/CommentPostButton"
import { CommentList } from "@/components/templates/list/CommentList"
import { CommentPostModal } from "@/components/templates/modal/CommentPostModal"
import { useCommentView } from "@/components/views/CommentView.hooks"
import styles from "@/components/views/CommentView.module.css"
import { isDefined, isValidArray } from "@/utils"

import type { CalculatedArticle } from "@/types/api"
import type { ComponentProps } from "react"

/** Props */
type Props = Pick<CalculatedArticle, "articleUrlId">

/**
 * コメントセクション表示用コンポーネント
 * コメントに関してはページビルド後に更新される可能性がありSSGできないのでAstroファイルではなくクライアントサイドでも動くReactコンポとして実装している
 */
export const CommentView = ({ articleUrlId }: Props) => {
  const {
    commentInfoList,
    userNameValue,
    bodyValue,
    userNameErrorMessage,
    bodyErrorMessage,
    errorMessage,
    handleBodyChange,
    handleCommentPostModalClose,
    handleCommentPostModalOpen,
    handleSubmit,
    handleUserNameChange,
    isCommentPostModalOpen,
    isCommentPosting
  } = useCommentView(articleUrlId)

  if (!isDefined(commentInfoList)) {
    return null
  }

  const commentCountIncludingReplies = commentInfoList.reduce(
    (count, comment) => count + 1 + comment.replies.length,
    0
  )

  const commentPostButtonCommonProps = {
    onClick: handleCommentPostModalOpen,
    type: "button"
  } as const satisfies Pick<ComponentProps<typeof CommentPostButton>, "onClick" | "type">

  return (
    <CommonViewContainer
      commentPostButton={
        <Modal
          icon={{
            name: "commentWithPen",
            coloringMethod: "fill"
          }}
          isOpen={isCommentPostModalOpen}
          onClose={handleCommentPostModalClose}
          title="コメントをどうぞ"
          triggerElement={
            // Fragment使うとエラーになるので注意
            <div>
              <ResponsiveContainer>
                <CommentPostButton shouldShowIconOnly {...commentPostButtonCommonProps} />
              </ResponsiveContainer>
              <ResponsiveContainer isPC>
                <div className={styles.postButton}>
                  <CommentPostButton {...commentPostButtonCommonProps} />
                </div>
              </ResponsiveContainer>
            </div>
          }
        >
          <CommentPostModal
            bodyErrorMessage={bodyErrorMessage}
            bodyValue={bodyValue}
            errorMessage={errorMessage}
            isPosting={isCommentPosting}
            onBodyChange={handleBodyChange}
            onSubmit={handleSubmit}
            onUserNameChange={handleUserNameChange}
            userNameErrorMessage={userNameErrorMessage}
            userNameValue={userNameValue}
          />
        </Modal>
      }
      icon={{
        name: "commentWithPen",
        coloringMethod: "fill"
      }}
      title={`この記事に寄せられたコメント (${commentCountIncludingReplies})`}
    >
      {isValidArray(commentInfoList) ? (
        <CommentList articleUrlId={articleUrlId} comments={commentInfoList} />
      ) : (
        <span className={styles.commentEmpty}>
          まだコメントされていません。コメントしてみませんか？
        </span>
      )}
    </CommonViewContainer>
  )
}
