import clsx from "clsx"

import styles from "@/components/parts/input/TextArea.module.css"
import { isValidString } from "@/utils"

import type { ComponentProps } from "react"

/** Props */
type Props = ComponentProps<"textarea"> & {
  /** 最大入力可能文字数 */
  maxLength: number
  /** エラーメッセージ */
  errorMessage?: string
}

/** TextAreaコンポーネント */
export const TextArea = ({ maxLength, errorMessage, ...textAreaProps }: Props) => {
  const currentLength = typeof textAreaProps.value === "string" ? textAreaProps.value.length : 0

  return (
    <div className={styles.textArea}>
      <textarea className={styles.input} maxLength={maxLength} {...textAreaProps} />

      <div className={clsx(styles.bottom, isValidString(errorMessage) && styles.HasError)}>
        {isValidString(errorMessage) && <span className={styles.error}>{errorMessage}</span>}
        {/** TODO: maxLengthの8割か9割行ったらcounterの文字色をオレンジにし、最大文字数まで行ったら赤色にする */}
        <span className={styles.counter}>
          {currentLength} / {maxLength}
        </span>
      </div>
    </div>
  )
}
