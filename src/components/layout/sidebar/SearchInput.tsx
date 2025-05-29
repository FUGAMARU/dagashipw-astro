import { Input } from "@/components/parts/input/Input"
import { KEYWORD_INPUT_NAME } from "@/constants/element"
import { PAGE_PATH } from "@/constants/page"
import { QUERY_PARAM_KEYS } from "@/constants/query"
import { isValidString } from "@/utils"

import type { FormEvent } from "react"

/** サイドバーで使う検索窓コンポーネント */
export const SearchInput = () => {
  /** キーワード検索処理 */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const keyword = formData.get(KEYWORD_INPUT_NAME)?.toString()

    if (!isValidString(keyword)) {
      return
    }

    location.href = `${PAGE_PATH.SEARCH}?${QUERY_PARAM_KEYS.KEYWORD}=${encodeURIComponent(keyword.trim())}`
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input hasSearchIcon placeholder="キーワードを入力…" />
    </form>
  )
}
