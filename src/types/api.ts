/**
 * @file APIレスポンス関連の型
 */

import type { components, operations, paths } from "@/types/schema"

/** 記事情報 (CMSで保持しているフォーマット) */
export type Article = components["schemas"]["Article"]

/** コメント情報 (CMSで保持しているフォーマット) */
export type Comment = components["schemas"]["Comment"]

/** APIの/articlesのレスポンス */
export type ArticlesPathResponse =
  paths["/articles"]["get"]["responses"]["200"]["content"]["application/json"]

/** APIの/commentsのレスポンス */
export type CommentsPathResponse =
  paths["/comments"]["get"]["responses"]["200"]["content"]["application/json"]

/** 取得するフィールドを指定して/articlesにリクエストを飛ばした時のレスポンスの型を生成するユーティリティー型 */
export type FieldPickedArticlePathResponse<
  SpecificKey extends keyof NonNullable<ArticlesPathResponse["data"]>[number]
> = Pick<NonNullable<ArticlesPathResponse["data"]>[number], "id" | "documentId" | SpecificKey>

/** ページネーション付きAPIレスポンス (どのコレクションでも同一のIFなので代表してArticleの型定義を引用している) */
export type PaginatedResponse<T> = components["schemas"]["ArticleListResponse"] & {
  /** データー */
  data?: Array<T>
}

/** コメント投稿時のリクエストパラメーター */
export type PostCommentRequestBody = {
  /** データー */
  data: Pick<
    operations["post/comments"]["requestBody"]["content"]["application/json"]["data"],
    | "userName"
    | "body"
    | "forceCreatedAt"
    | "articleUrlId"
    | "isAdministratorComment"
    | "parentCommentDocumentId"
  >
}

/** コメント投稿時のレスポンス */
export type PostCommentResponse =
  operations["post/comments"]["responses"]["200"]["content"]["application/json"]

/** ブラウザーから自己ホストしているコメント投稿用プロキシAPIにリクエストする時のパラメーター */
export type PostCommentFromBrowserRequestBody = Pick<
  PostCommentRequestBody["data"],
  "userName" | "body" | "parentCommentDocumentId"
> & {
  /** Cloudflare Turnstileのトークン */
  turnstileToken: string
}

/** コメント投稿用自己ホストAPIからバリデーションエラーをレスポンスする時のフォーマット */
export type PostCommentValidationErrorResponse = {
  /** ニックネーム欄のエラーメッセージ */
  userNameErrorMessage?: string
  /** コメント欄のエラーメッセージ */
  bodyErrorMessage?: string
}

/**
 * Cloudflare Turnstileのトークン検証APIのレスポンス
 * 公式ドキュメントを参考に手打ちしたもの
 *
 * @see https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
 */
export type TurnstileTokenVerifyApiResponse = {
  /** 検証が成功したかどうか */
  success: boolean
  /** チャレンジタイムスタンプ */
  challenge_ts: string
  /** ホスト名 */
  hostname?: string
  /** エラーコード */
  "error-codes"?: Array<string>
}

/** サイドバー用APIレスポンス */
export type SidebarApiResponse = {
  /** 日付 */
  date: string
  /** クライアントのIPアドレスがIPv4アドレスかどうか */
  isIPv4: boolean
}
