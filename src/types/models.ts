/**
 * @file モデルに関連する型定義
 */

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
