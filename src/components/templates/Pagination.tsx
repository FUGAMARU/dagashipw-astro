import { useRef } from "react"
import ResponsivePagination from "react-responsive-pagination"
import { useResizeObserver } from "usehooks-ts"

import { PAGE_PATH } from "@/constants/page"
import { QUERY_PARAM_KEYS } from "@/constants/query"
import { replaceTextInSquareBracket } from "@/utils/formatter"

import type { RefObject } from "react"

import "react-responsive-pagination/themes/classic.css"

/** 検索画面で使用する時のProps */
type SearchPageProps = {
  /** ユースケース */
  useCase: "keyword" | "tag"
  /** キーワード */
  keyword: string
}

/** 記事一覧で使用する時のProps */
type ArticleListPageProps = {
  /** ユースケース */
  useCase: "list"
}

/** Props */
type Props = (SearchPageProps | ArticleListPageProps) & {
  /** 現在のページ数 */
  currentPage: number
  /** 合計ページ数 */
  totalPageCount: number
}

/** ページネーション用コンポーネント */
export const Pagination = ({ currentPage, totalPageCount, useCase, ...rest }: Props) => {
  const paginationRef = useRef<HTMLDivElement>(null)

  const { width = paginationRef.current?.clientWidth } = useResizeObserver({
    ref: paginationRef as RefObject<HTMLElement>,
    box: "border-box"
  })

  /** ページを変更したときの処理 */
  const handlePageChange = (page: number) => {
    switch (useCase) {
      case "list":
        if (page === 1) {
          location.href = PAGE_PATH.TOP
          break
        }

        location.href = replaceTextInSquareBracket(
          PAGE_PATH.ARTICLE_LIST_WITH_PAGE,
          "page",
          String(page)
        )
        break
      case "keyword":
        if (!("keyword" in rest)) {
          break
        }

        location.href = `${replaceTextInSquareBracket(
          PAGE_PATH.SEARCH,
          "keyword",
          String(page)
        )}?${QUERY_PARAM_KEYS.KEYWORD}=${rest.keyword}&${QUERY_PARAM_KEYS.PAGE}=${page}`
        break
      case "tag":
        if (!("keyword" in rest)) {
          break
        }

        location.href = `${replaceTextInSquareBracket(
          PAGE_PATH.SEARCH,
          "keyword",
          String(rest.keyword)
        )}?${QUERY_PARAM_KEYS.TAG}=${rest.keyword}&${QUERY_PARAM_KEYS.PAGE}=${page}`
        break
    }
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
