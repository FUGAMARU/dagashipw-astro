/**
 * @file モデルに関連する型定義
 */

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
}

/** コメント情報 (CMSで保持しているフォーマットではなく内部的にコメント情報を扱う場合に用いるフォーマット) */
export type CommentInfo = MainCommentInfo & {
  /** 返信一覧 */
  replies: Array<MainCommentInfo>
}

/** CMSのコメントデーターをフロントエンド向けに変換する時の中間データーのフォーマット */
export type IntermediateCommentInfo = Omit<CommentInfo, "commentId" | "replies"> & {
  /** コメントID */
  documentId: string
  /** 親コメントID */
  parentCommentDocumentId?: string
  /** 返信一覧 */
  replies: Array<
    Omit<MainCommentInfo, "commentId"> & {
      /** コメントID */
      documentId: string
    }
  >
}

/** 記事ごとのタグの一覧 */
export type ArticleTags = {
  /** 記事URL ID */
  articleUrlId: string
  /** タグ一覧 */
  tags: Array<string>
}
