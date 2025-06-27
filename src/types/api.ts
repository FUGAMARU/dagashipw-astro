/**
 * @file APIレスポンス関連の型
 */

import type { ImageSources } from "@/types/image"
import type { components, operations, paths } from "@/types/schema"

/** コメント情報 (CMSで保持しているフォーマット) */
export type Comment = components["schemas"]["Comment"]

/** APIの/articlesのレスポンス */
export type ArticlesPathResponse =
  paths["/articles"]["get"]["responses"]["200"]["content"]["application/json"]

/** APIの/commentsのレスポンス */
export type CommentsPathResponse =
  paths["/comments"]["get"]["responses"]["200"]["content"]["application/json"]

/** 計算済み記事データー (計算はCMS側で行う) */
export type CalculatedArticle = {
  /** 記事のURL ID */
  articleUrlId: string
  /** バックナンバー */
  backNumber: number
  /** タイトル */
  title: string
  /** サムネイル */
  thumbnail: ImageSources
  /** サムネイルのオリジナルURL */
  originalThumbnailUrl: string
  /** テーマカラー */
  themeColor: string
  /** タグ一覧 */
  tags: Array<string>
  /** 記事本文段落冒頭 */
  bodyBeginningParagraph: string
  /** 記事本文 */
  body: string
  /** 投稿日 */
  createdAt: string
  /** 更新日 */
  updatedAt?: string
}

/** 計算済み記事データーをカスタムエンドポイントから取得した時のレスポンス (CMSのDocumentation Pluginが拾ってくれないので手打ち) */
export type CalculatedArticleResponse = {
  /** data */
  data: Array<CalculatedArticle>
} & Pick<ArticlesPathResponse, "meta">

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

/** コメント投稿用自己ホストAPIからエラーをレスポンスする時のフォーマット */
export type PostCommentErrorResponse = {
  /** ニックネーム欄のエラーメッセージ */
  userNameErrorMessage?: string
  /** コメント欄のエラーメッセージ */
  bodyErrorMessage?: string
  /** バリデーション以外のエラーメッセージ */
  errorMessage?: string
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
