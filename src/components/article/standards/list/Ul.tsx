import clsx from "clsx"
import { useEffect, useRef, useState } from "react"

import styles from "@/components/article/standards/list/Ul.module.css"
import { NESTED_UL_TAG_RECURSIVE_SEARCH_TERMINATION_POINT } from "@/constants/element"
import { isDefined } from "@/utils/isDefined"

import type { Children } from "@/types/children"

/** ulタグコンポーネント */
export const Ul = ({ children }: Children) => {
  const ulRef = useRef<HTMLUListElement>(null)
  const [isNestedUl, setIsNestedUl] = useState(false)

  useEffect(() => {
    if (!isDefined(ulRef.current)) {
      return
    }

    let current: HTMLElement | null = ulRef.current.parentElement // 自身を含まないようにするために親要素から探索を開始する
    let foundUl = null

    // 親要素を再帰的に探索してulタグがあるかどうかによって自身がネストされたulタグか判定する
    while (isDefined(current)) {
      if (current.id === NESTED_UL_TAG_RECURSIVE_SEARCH_TERMINATION_POINT) {
        // 最終到達点に辿り着いた場合は終了
        break
      }

      foundUl = current.closest("ul")
      if (isDefined(foundUl)) {
        // ulタグが見つかった場合は終了
        break
      }

      current = current.parentElement
    }

    setIsNestedUl(isDefined(foundUl))
  }, [])

  return (
    <ul ref={ulRef} className={clsx(styles.ulTag, isNestedUl && styles.Nested)}>
      {children}
    </ul>
  )
}
