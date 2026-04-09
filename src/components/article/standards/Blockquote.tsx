import { Children as ReactChildren } from "react"

import styles from "@/components/article/standards/Blockquote.module.css"
import { normalizeBlockquoteChild } from "@/components/article/standards/index.helpers"

import type { Children } from "@/types/children"

/** Blockquoteタグコンポーネント */
export const Blockquote = ({ children }: Children) => {
  const normalizedChildren = ReactChildren.map(children, normalizeBlockquoteChild)

  return (
    <blockquote className={styles.blockquoteTag}>
      <div className={styles.bar} />
      {normalizedChildren}
    </blockquote>
  )
}
