import ResponsivePagination from "react-responsive-pagination"

import { QUERY_PAGE } from "@/constants/query"

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
  /** ページを変更したときの処理 */
  const handlePageChange = (page: number) => {
    window.location.href = `?${QUERY_PAGE}=${page}`
  }

  return (
    <ResponsivePagination
      current={currentPage}
      onPageChange={handlePageChange}
      total={totalPageCount}
    />
  )
}
