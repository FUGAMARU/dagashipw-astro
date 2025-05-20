import useSWR from "swr/immutable"

import { CommonViewContainer } from "@/components/parts/CommonViewContainer"
import { ArticleCardMiniList } from "@/components/templates/list/ArticleCardMiniList"
import { selfHostedFetcher } from "@/services/self-hosted-api"
import { isValidArray } from "@/utils"

import type { ArticleInfo } from "@/types/models"

/** Props */
type Props = Pick<ArticleInfo, "articleUrlId">

/**
 * 同じタグが設定されている記事をランダムに表示するコンポーネント
 * ページロードの度にランダムに記事を表示したいのでCSRする必要があるためReactコンポーネントとして実装
 */
export const SameTagArticlesView = ({ articleUrlId }: Props) => {
  const { data: sameTagArticles } = useSWR<Array<ArticleInfo>>(
    {
      apiFunction: "getSameTagArticles",
      arg: articleUrlId
    },
    selfHostedFetcher
  )

  return (
    <CommonViewContainer
      sectionTitleProps={{
        title: "同じようなタグが設定されている記事",
        icon: { name: "hash", coloringMethod: "stroke" }
      }}
    >
      {isValidArray(sameTagArticles) && <ArticleCardMiniList cards={sameTagArticles} />}
    </CommonViewContainer>
  )
}
