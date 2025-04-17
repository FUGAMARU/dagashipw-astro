import { getComments } from "@/services/api"
import { isDefined } from "@/utils"
import { transformDataToCommentInfo } from "@/utils/transformer"

import type { APIRoute } from "astro"

export const prerender = false

/** 指定した記事のコメント一覧をレスポンスする */
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

  const comments = await getComments(articleUrlId)
  const commentInfoList = transformDataToCommentInfo(comments)

  return new Response(JSON.stringify(commentInfoList), {
    status: 200
  })
}
