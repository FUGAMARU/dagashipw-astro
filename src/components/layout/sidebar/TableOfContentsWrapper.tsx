import { TableOfContents } from "@/components/templates/TableOfContents"
import { useIsSP } from "@/hooks/useIsSP"

/**
 * TableOfContentsコンポーネントのラッパー
 * PCのみ表示する出し分けをここで行う (SPはInserterで記事に挿入する)
 * 目次データーの準備を行う
 */
export const TableOfContentsWrapper = () => {
  const isSP = useIsSP()

  // サイドバーでSP表示を出し分けるとreturn nullにしていてもアイテム間のgapは残るのでここで出し分ける
  if (isSP) {
    return null
  }

  return <TableOfContents />
}
