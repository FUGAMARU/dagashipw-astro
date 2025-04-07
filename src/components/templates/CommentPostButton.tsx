import { SvgLoader } from "@/components/parts/svg/SvgLoader"
import styles from "@/components/templates/CommentPostButton.module.css"

/** コメント投稿ボタン */
export const CommentPostButton = () => {
  /** ボタンを押下した時の処理 */
  const handleButtonClick = () => {
    alert("TODO: コメント投稿用モーダルを開く処理")
  }

  return (
    <button className={styles.commentPostButton} onClick={handleButtonClick} type="button">
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
