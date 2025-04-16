/**
 * @file モデルに関連する型定義
 */

import type { components } from "@/types/schema"

/** 記事情報 (CMSで保持しているフォーマット) */
export type Article = components["schemas"]["Article"]

/** 記事情報 (CMSで保持しているフォーマットではなく内部的に記事情報を扱う場合に用いるフォーマット) */
export type ArticleInfo = {
  /** 記事URL ID */
  articleUrlId: string
  /** バックナンバー */
  backNumber: number
  /** 記事タイトル */
  title: string
  /** サムネイル */
  thumbnailUrl: string
  /** サムネイルに紐づくテーマカラー */
  themeColor: string
  /** タグ */
  tags: Array<string>
  /** 記事本文段落冒頭 */
  bodyBeginningParagraph: string
  /** 作成日 */
  createdAt: string
  /** 更新日 */
  updatedAt?: string
  /** コメント数 */
  commentCount: number
}

/** コメント情報 (CMSで保持しているフォーマット) */
export type Comment = components["schemas"]["Comment"]

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
}

/** コメント情報 (CMSで保持しているフォーマットではなく内部的にコメント情報を扱う場合に用いるフォーマット) */
export type CommentInfo = MainCommentInfo & {
  /** 返信一覧 */
  replies: Array<MainCommentInfo>
}
