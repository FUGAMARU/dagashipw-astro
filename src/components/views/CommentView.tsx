import { CommonViewContainer } from "@/components/parts/CommonViewContainer"
import { Modal } from "@/components/parts/Modal"
import { CommentPostButton } from "@/components/templates/CommentPostButton"
import { CommentList } from "@/components/templates/list/CommentList"
import { CommentPostModal } from "@/components/templates/modal/CommentPostModal"
import { useCommentView } from "@/components/views/CommentView.hooks"
import styles from "@/components/views/CommentView.module.css"
import { isDefined, isValidArray } from "@/utils"

import type { ArticleInfo } from "@/types/models"

/** Props */
type Props = Pick<ArticleInfo, "articleUrlId">

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
    handleBodyChange,
    handleCommentPostModalClose,
    handleCommentPostModalOpen,
    handleSubmit,
    handleUserNameChange,
    isCommentPostModalOpen
  } = useCommentView(articleUrlId)

  if (!isDefined(commentInfoList)) {
    return null
  }

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
          triggerElement={<CommentPostButton onClick={handleCommentPostModalOpen} type="button" />}
        >
          <CommentPostModal
            bodyErrorMessage={bodyErrorMessage}
            bodyValue={bodyValue}
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
      title={`この記事に寄せられたコメント (${commentInfoList.length})`}
    >
      {isValidArray(commentInfoList) ? (
        <CommentList comments={commentInfoList} />
      ) : (
        <span className={styles.commentEmpty}>
          まだコメントされていません。コメントしてみませんか？
        </span>
      )}
    </CommonViewContainer>
  )
}
