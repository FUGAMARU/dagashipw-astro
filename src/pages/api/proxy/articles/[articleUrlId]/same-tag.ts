import { getRelatedArticles } from "@/components/views/SameTagArticleView.helpers"
import { getArticlesBatch, getArticleTagsForAllArticles } from "@/services/api"
import { isDefined } from "@/utils"
import { transformDataToArticleInfoBatch } from "@/utils/transformer"

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
  const relatedArticles = await getArticlesBatch(relatedArticleUrlIdList)
  const relatedArticleInfoList = await transformDataToArticleInfoBatch(relatedArticles)

  return new Response(JSON.stringify(relatedArticleInfoList), {
    status: 200
  })
}
