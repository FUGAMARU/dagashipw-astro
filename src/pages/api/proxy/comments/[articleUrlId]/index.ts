import axios from "axios"
import { RateLimiterMemory } from "rate-limiter-flexible"

import { TURNSTILE_SECRET_KEY } from "@/constants/env"
import {
  COMMENT_BODY_MAX_LENGTH,
  COMMENT_USER_NAME_MAX_LENGTH,
  TURNSTILE_VERIFY_API_ENDPOINT
} from "@/constants/value"
import { getComments, postComment } from "@/services/api"
import { isDefined, isValidString } from "@/utils"
import { transformDataToCommentInfo } from "@/utils/transformer"

import type {
  PostCommentFromBrowserRequestBody,
  PostCommentValidationErrorResponse,
  TurnstileTokenVerifyApiResponse
} from "@/types/api"
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

/** POSTリクエストのレートリミット (1つのIPアドレスにつき1分に1投稿まで) */
const POST_RATE_LIMIT = new RateLimiterMemory({
  points: 1,
  duration: 60
})

/**
 * 指定した記事に対してコメントを投稿する
 *
 * @param context - APIルートのコンテキスト
 * @param context.params - パスパラメータ
 * @param context.request - リクエストオブジェクト
 * @param context.clientAddress - クライアントのIPアドレス
 */
export const POST: APIRoute = async ({ params, request, clientAddress }) => {
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

  try {
    await POST_RATE_LIMIT.consume(clientAddress)
  } catch {
    return new Response(JSON.stringify({ error: "短時間のコメントの連続投稿はできません" }), {
      status: 429
    })
  }

  const requestBody = (await request.json()) as PostCommentFromBrowserRequestBody

  // -----バリデーション-----

  const userNameErrorMessage = isValidString(requestBody.userName)
    ? validateString(requestBody.userName.trim(), "userName")
    : undefined

  const bodyErrorMessage = isValidString(requestBody.body)
    ? validateString(requestBody.body.trim(), "body")
    : undefined

  if (isValidString(userNameErrorMessage) || isValidString(bodyErrorMessage)) {
    return new Response(
      JSON.stringify({
        userNameErrorMessage,
        bodyErrorMessage
      } satisfies PostCommentValidationErrorResponse),
      {
        status: 422
      }
    )
  }

  // -----Cloudflare Turnstileのトークン検証-----

  const { data } = await axios.post<TurnstileTokenVerifyApiResponse>(
    TURNSTILE_VERIFY_API_ENDPOINT,
    new URLSearchParams({
      secret: TURNSTILE_SECRET_KEY,
      response: requestBody.turnstileToken
    })
  )

  if (!data.success) {
    return new Response(JSON.stringify({ error: "Cloudflare Turnstileの検証に失敗しました" }), {
      status: 422
    })
  }

  const createdCommentDocumentId = await postComment(
    articleUrlId,
    requestBody.body.trim(),
    isValidString(requestBody.userName) ? requestBody.userName.trim() : undefined,
    requestBody.parentCommentDocumentId
  )

  return new Response(JSON.stringify(createdCommentDocumentId), {
    status: 201
  })
}

/**
 * 文字列をバリデーションする
 *
 * @param targetString - バリデーション対象のユーザー名、もしくはコメント本文
 * @param validationTarget - バリデーション対象の文字列の種類
 * @returns エラーメッセージ (バリデーションを通過した場合はundefined)
 */
export const validateString = (
  targetString: string,
  validationTarget: "userName" | "body"
): string | undefined => {
  if (validationTarget === "body" && !isValidString(targetString)) {
    return "テキストが入力されていません"
  }

  const maxLengths = {
    userName: COMMENT_USER_NAME_MAX_LENGTH,
    body: COMMENT_BODY_MAX_LENGTH
  }

  if (targetString.length > maxLengths[validationTarget]) {
    return validationTarget === "userName"
      ? "ニックネームは20文字以内で入力してください"
      : "コメントは1000文字以内で入力してください"
  }

  if (validationTarget === "body" && /\n{3,}/.test(targetString)) {
    return "連続した改行は使用できません"
  }

  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
  if (emailRegex.test(targetString)) {
    return "使用できない文字列が含まれています"
  }

  /** Wi-Fiのパスワードで使える記号 + 英数字 + 日本語(ひらがな、カタカナ、JIS第1・第2水準漢字、常用漢字、人名漢字などを含む一般的な範囲) + 絵文字 + 環境依存文字のみ許容 */
  const allowedCharsRegex =
    // eslint-disable-next-line no-misleading-character-class, no-irregular-whitespace
    /^[a-zA-Z0-9\u3040-\u309F\u30A0-\u30FF\uFF65-\uFF9F\u4E00-\u9FAF\u3400-\u4DBF!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~ 　\n、。「」『』（）？！・〇\u2460-\u2473\u2160-\u217F\u3200-\u33FF\uF900-\uFAFF\u200D\uFE0F\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{27BF}]*$/u
  if (!allowedCharsRegex.test(targetString)) {
    return "使用できない文字が含まれています"
  }

  return undefined
}
