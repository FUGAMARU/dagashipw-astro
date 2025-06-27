import { ArticleCardMini } from "@/components/parts/card/ArticleCardMini"
import styles from "@/components/templates/list/ArticleCardMiniList.module.css"
import { isValidArray } from "@/utils"

import type { CalculatedArticle } from "@/types/api"

/** Props */
type Props = {
  /** カード一覧 */
  cards?: Array<
    Pick<
      CalculatedArticle,
      "articleUrlId" | "createdAt" | "updatedAt" | "thumbnail" | "themeColor" | "title"
    >
  >
}

/** ArticleCardMiniコンポーネントを並べて表示するためのコンポーネント */
export const ArticleCardMiniList = ({ cards }: Props) => {
  return (
    <div className={styles.articleCardMiniList}>
      {isValidArray(cards)
        ? cards.map(card => <ArticleCardMini key={card.articleUrlId} {...card} />)
        : Array.from({ length: 4 }, (_, index) => <ArticleCardMini key={index} isFallback />)}
    </div>
  )
}
