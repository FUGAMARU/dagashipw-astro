import styles from "@/components/parts/input/TextArea.module.css"
import { isValidString } from "@/utils"

import type { ComponentProps } from "react"

/** Props */
type Props = ComponentProps<"textarea"> & {
  /** エラーメッセージ */
  errorMessage?: string
}

/** TextAreaコンポーネント */
export const TextArea = ({ errorMessage, ...textAreaProps }: Props) => {
  return (
    <div className={styles.textArea}>
      <textarea className={styles.input} {...textAreaProps} />
      {isValidString(errorMessage) && <span className={styles.error}>{errorMessage}</span>}
    </div>
  )
}
