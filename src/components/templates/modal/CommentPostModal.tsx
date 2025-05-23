import { Input } from "@/components/parts/input/Input"
import { TextArea } from "@/components/parts/input/TextArea"
import { CommentPostButton } from "@/components/templates/CommentPostButton"
import styles from "@/components/templates/modal/CommentPostModal.module.css"
import { COMMENT_BODY_MAX_LENGTH, COMMENT_USER_NAME_MAX_LENGTH } from "@/constants/value"

import type { ComponentProps } from "react"

/** Props */
type Props = Required<Pick<ComponentProps<"form">, "onSubmit">> & {
  /** ニックネーム欄の値 */
  userNameValue: ComponentProps<typeof Input>["value"]
  /** コメント欄の値 */
  bodyValue: ComponentProps<typeof TextArea>["value"]
  /** ニックネーム欄のエラーメッセージ */
  userNameErrorMessage: ComponentProps<typeof Input>["errorMessage"]
  /** コメント欄のエラーメッセージ */
  bodyErrorMessage: ComponentProps<typeof TextArea>["errorMessage"]
  /** ニックネーム欄の入力が変更された時の処理 */
  onUserNameChange: ComponentProps<typeof Input>["onChange"]
  /** コメント欄の入力が変更された時の処理 */
  onBodyChange: ComponentProps<typeof TextArea>["onChange"]
}

/** コメント投稿用モーダル */
export const CommentPostModal = ({
  userNameValue,
  bodyValue,
  userNameErrorMessage,
  bodyErrorMessage,
  onUserNameChange: handleUserNameChange,
  onBodyChange: handleBodyChange,
  onSubmit: handleSubmit
}: Props) => {
  return (
    <form className={styles.commentPostModal} onSubmit={handleSubmit}>
      <Input
        errorMessage={userNameErrorMessage}
        maxLength={COMMENT_USER_NAME_MAX_LENGTH}
        onChange={handleUserNameChange}
        placeholder="ニックネーム (任意・20文字まで)"
        type="text"
        value={userNameValue}
      />

      <TextArea
        errorMessage={bodyErrorMessage}
        maxLength={COMMENT_BODY_MAX_LENGTH}
        onChange={handleBodyChange}
        placeholder="本文"
        value={bodyValue}
      />

      <div className={styles.post}>
        <CommentPostButton
          disabled={typeof bodyValue === "string" && bodyValue?.length === 0}
          type="submit"
        />
      </div>
    </form>
  )
}
