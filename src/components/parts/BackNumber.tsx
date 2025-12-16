import clsx from "clsx"

import styles from "@/components/parts/BackNumber.module.css"

import type { CalculatedArticle } from "@/types/api"

/** Props */
type Props = {
  /** 用途 */
  purpose: "articleCard" | "hero"
} & Pick<CalculatedArticle, "backNumber">

/** バックナンバー */
export const BackNumber = ({ backNumber, purpose }: Props) => {
  return (
    <div className={styles.backNumber}>
      <span
        className={clsx(styles.text, {
          [styles.ArticleCard]: purpose === "articleCard",
          [styles.Hero]: purpose === "hero"
        })}
      >{`#${backNumber}`}</span>
    </div>
  )
}
