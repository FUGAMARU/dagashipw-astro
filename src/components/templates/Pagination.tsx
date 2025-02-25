import ResponsivePagination from "react-responsive-pagination"

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
  /** ページを変更したときの処理 */
  const handlePageChange = (page: number) => {
    // TODO: 共通関数化したい
    window.location.href = PAGE_PATH.ARTICLE_LIST_WITH_PAGE.replace("[page]", String(page))
  }

  return (
    <ResponsivePagination
      current={currentPage}
      onPageChange={handlePageChange}
      total={totalPageCount}
    />
  )
}
