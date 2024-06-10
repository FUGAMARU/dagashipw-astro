import { useCallback, type ComponentProps, type ReactNode } from "react"

import Icon from "@/components/parts/icon/Icon"
import styles from "@/components/parts/input/Input.module.css"

type Props = ComponentProps<"input"> & {
  hasSearchIcon?: boolean
}

/**
 * 入力欄
 * @returns ReactNode
 */
const Input = ({ hasSearchIcon = false, ...props }: Props): ReactNode => {
  const handleSearchButtonClick = useCallback(() => {
    alert("TODO: 検索処理")
  }, [])

  return (
    <div className={styles.inputContainer}>
      <input className={styles.inputElement} type="text" {...props} />
      {hasSearchIcon && (
        <button onClick={handleSearchButtonClick} type="button">
          <Icon className={styles.searchIcon} height={16} name="search" width={16} />
        </button>
      )}
    </div>
  )
}

export default Input
