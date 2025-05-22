import { getComments, postComment } from "@/services/api"
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

/**
 * 指定した記事に対してコメントを投稿する
 *
 * @param context - APIルートのコンテキスト
 * @param context.params - パスパラメータ
 * @param context.request - リクエストオブジェクト
 */
export const POST: APIRoute = async ({ params, request }) => {
  const { articleUrlId } = params

  if (!isDefined(articleUrlId)) {
    return new Response(JSON.stringify({ error: "articleUrlIdが指定されていません" }), {
      status: 400
    })
  }

  if (request.headers.get("Content-Type") !== "application/json") {
    return new Response(JSON.stringify({ error: "Content-Typeが不正です" }), {
      status: 400
    })
  }

  const body = await request.json()

  const createdCommentDocumentId = await postComment(
    articleUrlId,
    body.body,
    body.userName,
    body.parentCommentDocumentId
  )

  return new Response(JSON.stringify(createdCommentDocumentId), {
    status: 201
  })
}
