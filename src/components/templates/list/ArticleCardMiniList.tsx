import { ArticleCardMini } from "@/components/parts/card/ArticleCardMini"
import styles from "@/components/templates/list/ArticleCardMiniList.module.css"

import type { ComponentProps } from "react"

/** Props */
type Props = {
  /** カード一覧 */
  cards: Array<ComponentProps<typeof ArticleCardMini>>
}

/** ArticleCardMiniコンポーネントを並べて表示するためのコンポーネント */
export const ArticleCardMiniList = ({ cards }: Props) => {
  return (
    <div className={styles.articleCardMiniList}>
      {cards.map(card => (
        <div key={card.articleUrlId} className={styles.card}>
          <ArticleCardMini {...card} />
        </div>
      ))}
    </div>
  )
}
