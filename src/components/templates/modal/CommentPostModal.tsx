import { useState } from "react"
import Turnstile, { useTurnstile } from "react-turnstile"

import { Input } from "@/components/parts/input/Input"
import { TextArea } from "@/components/parts/input/TextArea"
import { CommentPostButton } from "@/components/templates/CommentPostButton"
import styles from "@/components/templates/modal/CommentPostModal.module.css"
import { TURNSTILE_SITE_KEY } from "@/constants/env"
import { COMMENT_BODY_MAX_LENGTH, COMMENT_USER_NAME_MAX_LENGTH } from "@/constants/value"
import { isValidString } from "@/utils"

import type { ComponentProps, FormEvent } from "react"

/** Props */
type Props = {
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
  /** バリデーション以外のエラーメッセージ */
  errorMessage?: string
  /** 投稿処理 */
  onSubmit: (e: FormEvent<HTMLFormElement>, turnstileToken: string) => Promise<void> | void
} & Required<Pick<ComponentProps<typeof CommentPostButton>, "isPosting">>

/** コメント投稿用モーダル */
export const CommentPostModal = ({
  bodyErrorMessage,
  bodyValue,
  onBodyChange: handleBodyChange,
  onUserNameChange: handleUserNameChange,
  userNameErrorMessage,
  userNameValue,
  errorMessage,
  onSubmit: handleSubmit,
  isPosting
}: Props) => {
  const turnstile = useTurnstile()
  const [turnstileToken, setTurnstileToken] = useState<string>()

  return (
    <form className={styles.commentPostModal} onSubmit={e => handleSubmit(e, turnstileToken ?? "")}>
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

      {isValidString(errorMessage) && <div className={styles.error}>{errorMessage}</div>}

      <div className={styles.footer}>
        <Turnstile
          fixedSize
          language="ja"
          onExpire={() => turnstile.reset()}
          onVerify={setTurnstileToken}
          sitekey={TURNSTILE_SITE_KEY}
          theme="light"
        />

        <div className={styles.button}>
          <CommentPostButton
            disabled={
              (typeof bodyValue === "string" && !isValidString(bodyValue)) ||
              !isValidString(turnstileToken)
            }
            isPosting={isPosting}
            type="submit"
          />
        </div>
      </div>
    </form>
  )
}
