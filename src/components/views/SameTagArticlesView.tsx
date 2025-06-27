import useSWR from "swr/immutable"

import { CommonViewContainer } from "@/components/parts/CommonViewContainer"
import { ArticleCardMiniList } from "@/components/templates/list/ArticleCardMiniList"
import { selfHostedFetcher } from "@/services/self-hosted-api"

import type { CalculatedArticle } from "@/types/api"

/** Props */
type Props = Pick<CalculatedArticle, "articleUrlId">

/**
 * 同じタグが設定されている記事をランダムに表示するコンポーネント
 * ページロードの度にランダムに記事を表示したいのでCSRする必要があるためReactコンポーネントとして実装
 */
export const SameTagArticlesView = ({ articleUrlId }: Props) => {
  const { data: sameTagArticles } = useSWR<Array<CalculatedArticle>>(
    {
      apiFunction: "getSameTagArticles",
      arg: articleUrlId
    },
    selfHostedFetcher
  )

  return (
    <CommonViewContainer
      icon={{ name: "hash", coloringMethod: "stroke" }}
      title="同じようなタグが設定されている記事"
    >
      <ArticleCardMiniList cards={sameTagArticles} />
    </CommonViewContainer>
  )
}
