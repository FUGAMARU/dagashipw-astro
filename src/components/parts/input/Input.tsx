import styles from "@/components/parts/input/Input.module.css"
import { SvgLoader } from "@/components/parts/svg/SvgLoader"
import { KEYWORD_INPUT_NAME } from "@/constants/element"
import { isValidString } from "@/utils"

import type { ComponentProps } from "react"

/** Props */
type Props = ComponentProps<"input"> & {
  /** 検索アイコンを表示するか */
  hasSearchIcon?: boolean
  /** エラーメッセージ */
  errorMessage?: string
}

/** 入力欄 */
export const Input = ({ hasSearchIcon = false, errorMessage, ...props }: Props) => {
  return (
    <div className={styles.inputContainer}>
      <input className={styles.inputElement} name={KEYWORD_INPUT_NAME} type="text" {...props} />
      {hasSearchIcon && (
        <button type="submit">
          <SvgLoader className={styles.searchIcon} name="search" />
        </button>
      )}
      {isValidString(errorMessage) && <span className={styles.error}>{errorMessage}</span>}
    </div>
  )
}
