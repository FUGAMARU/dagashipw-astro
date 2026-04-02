/**
 * @file APIレスポンス関連の型
 */

import type { ImageSources } from "@/types/image"
import type {
  CalculatedApiMeta,
  DirectusCommentItem,
  DirectusItemsMeta,
  DirectusSingleItemResponse
} from "@/types/schema"

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

/** 計算済み記事データのレスポンス */
export type CalculatedArticleResponse = {
  /** data */
  data: Array<CalculatedArticle>
  /** メタ情報 */
  meta?: CalculatedApiMeta
}

/** 子コメントのフォーマット */
type MainCommentInfo = {
  /** コメントID */
  commentId: string
  /** ユーザー名 */
  userName: string
  /** 投稿日時 */
  submittedAt: string
  /** 本文 */
  body: string
  /** 管理者による投稿かどうか */
  isAdministratorComment: boolean
}

/** 計算済みコメントデーター (計算はCMS側で行う) */
export type CalculatedComment = MainCommentInfo & {
  /** 返信一覧 */
  replies: Array<MainCommentInfo>
}

/** 計算済みコメントデータのレスポンス */
export type CalculatedCommentResponse = {
  /** data */
  data: Array<CalculatedComment>
}

/** コメント一覧レスポンス */
export type CommentsItemsResponse = {
  /** データ */
  data: Array<DirectusCommentItem>
  /** メタ情報 */
  meta?: DirectusItemsMeta
}

/** コメント投稿時のリクエストパラメーター */
export type PostCommentRequestBody = Pick<
  DirectusCommentItem,
  "article_url_id" | "body" | "force_created_at"
> & {
  /** ユーザー名 */
  user_name?: DirectusCommentItem["user_name"]
  /** 親コメントID */
  parent_comment_id?: DirectusCommentItem["parent_comment_id"]
  /** 管理者コメントかどうか */
  is_administrator_comment: NonNullable<DirectusCommentItem["is_administrator_comment"]>
}

/** コメント投稿時のレスポンス */
export type PostCommentResponse = DirectusSingleItemResponse<DirectusCommentItem>

/** ブラウザーから自己ホストしているコメント投稿用プロキシAPIにリクエストする時のパラメーター */
export type PostCommentFromBrowserRequestBody = {
  /** ユーザー名 */
  userName?: string
  /** 本文 */
  body: string
  /** 親コメントID */
  parentCommentDocumentId?: string
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
