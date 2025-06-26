import { getRelatedArticles } from "@/components/views/SameTagArticleView.helpers"
import { getArticle, getArticleTagsForAllArticles } from "@/services/api"
import { isDefined } from "@/utils"
import { transformDataToArticleInfo } from "@/utils/transformer"

import type { APIRoute } from "astro"

export const prerender = false

/** 指定した記事と同じタグが設定されている他の記事をランダムに選出しレスポンスする */
export const GET: APIRoute = async ({ params }) => {
  const { articleUrlId } = params

  if (!isDefined(articleUrlId)) {
    return new Response(
      JSON.stringify({
        error: "articleUrlIdが指定されていません"
      }),
      {
        status: 400
      }
    )
  }

  const articleTagsForAllArticles = await getArticleTagsForAllArticles()
  const relatedArticleUrlIdList = getRelatedArticles(articleTagsForAllArticles, articleUrlId)
  const relatedArticles = (
    await Promise.all(relatedArticleUrlIdList.map(articleUrlId => getArticle(articleUrlId)))
  ).filter(isDefined)

  const relatedArticleInfoList = await Promise.all(
    relatedArticles.map(article => transformDataToArticleInfo(article, "smaller"))
  )

  return new Response(JSON.stringify(relatedArticleInfoList), {
    status: 200
  })
}
