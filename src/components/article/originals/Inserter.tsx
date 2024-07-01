import styles from "@/components/article/originals/Inserter.module.css"
import TableOfContents from "@/components/templates/TableOfContents"
import useIsSP from "@/hooks/useIsSP"
import useTableOfContents from "@/hooks/useTableOfContents"
import { isDefined } from "@/utils/isDefined"

import type { ReactNode } from "react"

type Props = {
  /** 表示するもの */
  type: "tableOfContents" | "ad"
}

/**
 * 記事中で目次や広告を挿入するためのコンポーネント
 * @returns ReactNode
 */
const Inserter = ({ type }: Props): ReactNode => {
  const isSP = useIsSP()
  const tableOfContentsData = useTableOfContents()

  if (
    type === "tableOfContents" &&
    isDefined(tableOfContentsData) &&
    tableOfContentsData.length !== 0 &&
    isSP // PCではサイドバーに目次を表示するので記事中には表示しない
  ) {
    return (
      <div className={styles.inserterContainer}>
        <TableOfContents contents={tableOfContentsData} />
      </div>
    )
  }

  return null
}

export default Inserter
