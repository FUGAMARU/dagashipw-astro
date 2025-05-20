import { SvgLoader } from "@/components/parts/svg/SvgLoader"
import styles from "@/components/templates/CommentPostButton.module.css"

import type { ComponentProps } from "react"

/** Props */
type Props = Pick<ComponentProps<"button">, "type" | "onClick">

/** コメント投稿ボタン */
export const CommentPostButton = ({ type, onClick: handleClick }: Props) => {
  return (
    <button className={styles.commentPostButton} onClick={handleClick} type={type}>
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
