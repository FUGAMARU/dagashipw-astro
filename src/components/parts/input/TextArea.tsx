import clsx from "clsx"
import { useState } from "react"

import styles from "@/components/parts/input/TextArea.module.css"
import { isValidString } from "@/utils"

import type { ChangeEvent, ComponentProps } from "react"

/** Props */
type Props = ComponentProps<"textarea"> & {
  /** 最大入力可能文字数 */
  maxLength: number
  /** エラーメッセージ */
  errorMessage?: string
}

/** TextAreaコンポーネント */
export const TextArea = ({ maxLength, errorMessage, ...textAreaProps }: Props) => {
  const [currentLength, setCurrentLength] = useState(0)

  /** textareaの入力が変更された時の処理 */
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentLength(e.target.value.length)
    textAreaProps.onChange?.(e)
  }

  return (
    <div className={styles.textArea}>
      <textarea
        className={styles.input}
        maxLength={maxLength}
        {...textAreaProps}
        onChange={handleChange}
      />

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
