import styles from "@/components/article/originals/Inserter.module.css"
import { TableOfContents } from "@/components/templates/TableOfContents"
import { useIsSP } from "@/hooks/useIsSP"
import { isValidArray } from "@/utils"
import { generateTableOfContentsFormat } from "@/utils/markdown"
import { calculateReadingTime } from "@/utils/table-of-contents"

import type { Article } from "@/types/api"

/** Props */
type Props = {
  /** 表示するもの */
  type: "tableOfContents" | "ad"
  /** 記事 */
  article: Article
}

/** 記事中で目次や広告を挿入するためのコンポーネント */
export const Inserter = ({ type, article }: Props) => {
  const tableOfContentsData = generateTableOfContentsFormat(article.body)
  const minutesToRead = calculateReadingTime(article.body)
  const isSP = useIsSP()

  if (
    type === "tableOfContents" &&
    isValidArray(tableOfContentsData) &&
    isSP // PCではサイドバーに目次を表示するので記事中には表示しない
  ) {
    return (
      <div className={styles.inserterContainer}>
        <TableOfContents minutesToRead={minutesToRead} tableOfContentsData={tableOfContentsData} />
      </div>
    )
  }

  return null
}
