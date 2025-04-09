import { useRef, type RefObject } from "react"
import ResponsivePagination from "react-responsive-pagination"
import { useResizeObserver } from "usehooks-ts"

import { PAGE_PATH } from "@/constants/page"

import "react-responsive-pagination/themes/classic.css"

/** Props */
type Props = {
  /** 現在のページ数 */
  currentPage: number
  /** 合計ページ数 */
  totalPageCount: number
}

/** ページネーション用コンポーネント */
export const Pagination = ({ currentPage, totalPageCount }: Props) => {
  const paginationRef = useRef<HTMLDivElement>(null)

  const { width = paginationRef.current?.clientWidth } = useResizeObserver({
    ref: paginationRef as RefObject<HTMLElement>,
    box: "border-box"
  })

  /** ページを変更したときの処理 */
  const handlePageChange = (page: number) => {
    // TODO: 共通関数化したい
    window.location.href = PAGE_PATH.ARTICLE_LIST_WITH_PAGE.replace("[page]", String(page))
  }

  return (
    <div ref={paginationRef}>
      <ResponsivePagination
        current={currentPage}
        maxWidth={width}
        onPageChange={handlePageChange}
        total={totalPageCount}
      />
    </div>
  )
}
