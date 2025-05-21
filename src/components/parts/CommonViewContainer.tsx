import styles from "@/components/parts/CommonViewContainer.module.css"
import { Modal } from "@/components/parts/Modal"
import { SectionTitle } from "@/components/parts/SectionTitle"
import { CommentPostButton } from "@/components/templates/CommentPostButton"
import { CommentPostModal } from "@/components/templates/modal/CommentPostModal"

import type { Children } from "@/types/children"
import type { ComponentProps } from "react"

/** CommentViewから参照する用のProps */
type CommentViewProps = {
  /** CommentViewコンポーネントからの参照か */
  isReferredFromCommentView: true
  /** コメント投稿モーダルを開く処理 */
  onOpen: () => void
} & Pick<ComponentProps<typeof Modal>, "isOpen" | "onClose"> &
  ComponentProps<typeof CommentPostModal>

/** その他のコンポーネントから参照する用のProps */
type OtherViewProps = {
  /** CommentViewコンポーネントからの参照か */
  isReferredFromCommentView?: false
}

/** 共通Props */
type CommonProps = {
  /** SectionTitleコンポーネントのProps */
  sectionTitleProps: ComponentProps<typeof SectionTitle>
} & Children

/** Props */
type Props = (CommentViewProps | OtherViewProps) & CommonProps

/** Viewコンポーネントのコンテナ */
export const CommonViewContainer = ({ children, sectionTitleProps, ...rest }: Props) => {
  const isReferredFromCommentView =
    "isReferredFromCommentView" in rest &&
    "onOpen" in rest &&
    "isOpen" in rest &&
    "onClose" in rest &&
    "onSubmit" in rest &&
    "userNameValue" in rest &&
    "bodyValue" in rest &&
    "onUserNameChange" in rest &&
    "onBodyChange" in rest

  return (
    <div className={styles.commonViewContainer}>
      <div className={styles.header}>
        <SectionTitle {...sectionTitleProps} />

        {isReferredFromCommentView && (
          <Modal
            icon={{
              name: "commentWithPen",
              coloringMethod: "fill"
            }}
            isOpen={rest.isOpen}
            onClose={rest.onClose}
            title="コメントをどうぞ"
            triggerElement={<CommentPostButton onClick={rest.onOpen} type="button" />}
          >
            <CommentPostModal
              bodyValue={rest.bodyValue}
              onBodyChange={rest.onBodyChange}
              onSubmit={rest.onSubmit}
              onUserNameChange={rest.onUserNameChange}
              userNameValue={rest.userNameValue}
            />
          </Modal>
        )}
      </div>

      {children}
    </div>
  )
}
