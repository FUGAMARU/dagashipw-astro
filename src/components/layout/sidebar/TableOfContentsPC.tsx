import { type ReactNode } from "react"

import TableOfContents from "@/components/templates/TableOfContents"
import useIsSP from "@/hooks/useIsSP"
import useTableOfContents from "@/hooks/useTableOfContents"
import { isDefined } from "@/utils/isDefined"

/**
 * TableOfContentsコンポーネントのラッパー
 * 目次データーの準備を行う
 * @returns ReactNode
 */
const TableOfContentsWrapper = (): ReactNode => {
  const isSP = useIsSP()
  const tableOfContentsData = useTableOfContents()

  // サイドバーでSP表示を出し分けるとreturn nullにしていてもアイテム間のgapは残るのでここで出し分ける
  if (!isDefined(tableOfContentsData) || tableOfContentsData.length === 0 || isSP) {
    return null
  }

  return <TableOfContents activeItemHref="" contents={tableOfContentsData} />
}

export default TableOfContentsWrapper
