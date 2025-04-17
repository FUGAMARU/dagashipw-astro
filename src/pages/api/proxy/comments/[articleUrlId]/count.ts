import { getCommentCount } from "@/services/api"
import { isDefined } from "@/utils"

import type { APIRoute } from "astro"

export const prerender = false

/** 指定した記事のコメント数をレスポンスする */
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

  const commentCount = await getCommentCount(articleUrlId)

  return new Response(JSON.stringify(commentCount), {
    status: 200
  })
}
