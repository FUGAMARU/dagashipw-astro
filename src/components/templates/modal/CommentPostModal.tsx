import { Input } from "@/components/parts/input/Input"
import { TextArea } from "@/components/parts/input/TextArea"
import { CommentPostButton } from "@/components/templates/CommentPostButton"
import styles from "@/components/templates/modal/CommentPostModal.module.css"
import { COMMENT_MAX_LENGTH } from "@/constants/value"

import type { ChangeEvent, ComponentProps } from "react"

/** Props */
type Props = Required<Pick<ComponentProps<"form">, "onSubmit">> & {
  /** ニックネーム欄の値 */
  userNameValue: string
  /** コメント欄の値 */
  bodyValue: string
  /** ニックネーム欄の入力が変更された時の処理 */
  onUserNameChange: (event: ChangeEvent<HTMLInputElement>) => void
  /** コメント欄の入力が変更された時の処理 */
  onBodyChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
}

/** コメント投稿用モーダル */
export const CommentPostModal = ({
  userNameValue,
  bodyValue,
  onUserNameChange: handleUserNameChange,
  onBodyChange: handleBodyChange,
  onSubmit: handleSubmit
}: Props) => {
  return (
    <form className={styles.commentPostModal} onSubmit={handleSubmit}>
      <Input
        maxLength={COMMENT_MAX_LENGTH}
        onChange={handleUserNameChange}
        placeholder="ニックネーム (任意)"
        type="text"
        value={userNameValue}
      />

      <TextArea
        maxLength={COMMENT_MAX_LENGTH}
        onChange={handleBodyChange}
        placeholder="本文"
        value={bodyValue}
      />

      <div className={styles.post}>
        <CommentPostButton type="submit" />
      </div>
    </form>
  )
}
