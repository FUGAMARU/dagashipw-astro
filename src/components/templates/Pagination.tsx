import ResponsivePagination from "react-responsive-pagination"

import { QUERY_PAGE } from "@/constants/query"

import type { ReactNode } from "react"

import "react-responsive-pagination/themes/classic.css"

type Props = {
  /** 現在のページ数 */
  currentPage: number
  /** 合計ページ数 */
  totalPageCount: number
}

/**
 * NextUIのPaginationをラップしたコンポーネント
 * @returns ページネーションコンポーネント
 */
export const Pagination = ({ currentPage, totalPageCount }: Props): ReactNode => {
  /**
   * ページを変更したときの処理
   * @param page 変更後のページ数
   */
  const handlePageChange = (page: number): void => {
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
