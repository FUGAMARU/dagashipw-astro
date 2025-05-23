import clsx from "clsx"

import { SvgLoader } from "@/components/parts/svg/SvgLoader"
import styles from "@/components/templates/CommentPostButton.module.css"

import type { ComponentProps } from "react"

/** Props */
type Props = Pick<ComponentProps<"button">, "type" | "onClick" | "disabled">

/** コメント投稿ボタン */
export const CommentPostButton = ({ type, onClick: handleClick, disabled = false }: Props) => {
  return (
    <button
      className={clsx(styles.commentPostButton, disabled && styles.Disabled)}
      disabled={disabled}
      onClick={handleClick}
      type={type}
    >
      <span className={styles.sp}>
        <SvgLoader height={20} name="penPlus" width={20} />
      </span>

      <div className={styles.pc}>
        <SvgLoader height={18} name="penPlus" width={18} />
        <span className={styles.text}>コメントを残す</span>
      </div>
    </button>
  )
}
