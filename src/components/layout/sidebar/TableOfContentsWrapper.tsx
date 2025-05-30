import { TableOfContents } from "@/components/templates/TableOfContents"
import { useIsSP } from "@/hooks/useIsSP"
import { isValidArray } from "@/utils"
import { calculateReadingTime, generateTableOfContentsFormat } from "@/utils/table-of-contents"

import type { Article } from "@/types/api"

/** Props */
type Props = {
  /** 記事 */
  article: Article
}

/**
 * TableOfContentsコンポーネントのラッパー
 * PCのみ表示する出し分けをここで行う (SPはInserterで記事に挿入する)
 * 目次データーの準備を行う
 */
export const TableOfContentsWrapper = ({ article }: Props) => {
  const tableOfContentsData = generateTableOfContentsFormat(article.body)
  const minutesToRead = calculateReadingTime(article.body)
  const isSP = useIsSP()

  // サイドバーでSP表示を出し分けるとreturn nullにしていてもアイテム間のgapは残るのでここで出し分ける
  if (isSP || !isValidArray(tableOfContentsData)) {
    return null
  }

  return <TableOfContents minutesToRead={minutesToRead} tableOfContentsData={tableOfContentsData} />
}
