import { getSameTagArticles } from "@/services/api"
import { isDefined } from "@/utils"

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

  const result = await getSameTagArticles(articleUrlId)

  return new Response(JSON.stringify(result), {
    status: 200
  })
}
