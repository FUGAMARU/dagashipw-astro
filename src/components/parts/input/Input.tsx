import { useCallback } from "react"

import styles from "@/components/parts/input/Input.module.css"
import { SvgLoader } from "@/components/parts/svg/SvgLoader"
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
  const handleSearchButtonClick = useCallback(() => {
    alert("TODO: 検索処理")
  }, [])

  return (
    <div className={styles.inputContainer}>
      <input className={styles.inputElement} type="text" {...props} />
      {hasSearchIcon && (
        <button onClick={handleSearchButtonClick} type="button">
          <SvgLoader className={styles.searchIcon} height={16} name="search" width={16} />
        </button>
      )}
      {isValidString(errorMessage) && <span className={styles.error}>{errorMessage}</span>}
    </div>
  )
}
