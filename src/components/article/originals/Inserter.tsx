import styles from "@/components/article/originals/Inserter.module.css"
import { TableOfContents } from "@/components/templates/TableOfContents"
import { useIsSP } from "@/hooks/useIsSP"

/** Props */
type Props = {
  /** 表示するもの */
  type: "tableOfContents" | "ad"
}

/** 記事中で目次や広告を挿入するためのコンポーネント */
export const Inserter = ({ type }: Props) => {
  const isSP = useIsSP()

  if (
    type === "tableOfContents" &&
    isSP // PCではサイドバーに目次を表示するので記事中には表示しない
  ) {
    return (
      <div className={styles.inserterContainer}>
        <TableOfContents />
      </div>
    )
  }

  return null
}
