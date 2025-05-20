import { Input } from "@/components/parts/input/Input"
import { TextArea } from "@/components/parts/input/TextArea"
import { CommentPostButton } from "@/components/templates/CommentPostButton"
import { COMMENT_MAX_LENGTH } from "@/constants/value"

import type { ComponentProps } from "react"

import styles from "@/components/templates/modal/CommentPostModal.module.css"

/** Props */
type Props = Required<Pick<ComponentProps<"form">, "onSubmit">>

/** コメント投稿用モーダル */
export const CommentPostModal = ({ onSubmit: handleSubmit }: Props) => {
  return (
    <form className={styles.commentPostModal} onSubmit={handleSubmit}>
      <Input placeholder="ニックネーム (任意)" />

      <TextArea maxLength={COMMENT_MAX_LENGTH} placeholder="本文" />

      <div className={styles.post}>
        <CommentPostButton type="submit" />
      </div>
    </form>
  )
}
