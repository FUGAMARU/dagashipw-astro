import { type ReactNode } from "react"

import TableOfContents from "@/components/templates/TableOfContents"
import useIsSP from "@/hooks/useIsSP"

/**
 * TableOfContentsコンポーネントのラッパー
 * 目次データーの準備を行う
 * @returns ReactNode
 */
const TableOfContentsWrapper = (): ReactNode => {
  const isSP = useIsSP()

  // サイドバーでSP表示を出し分けるとreturn nullにしていてもアイテム間のgapは残るのでここで出し分ける
  if (isSP) {
    return null
  }

  return <TableOfContents />
}

export default TableOfContentsWrapper
