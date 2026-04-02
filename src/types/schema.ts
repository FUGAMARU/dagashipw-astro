/**
 * @file APIスキーマの型定義
 */

/** コメントデータのアイテム */
export interface DirectusCommentItem {
  /** コメントID (UUID) */
  comment_id: string
  /** 親コメントID */
  parent_comment_id: string | null
  /** 記事のURL ID */
  article_url_id: string
  /** 手動設定の投稿日時 */
  force_created_at: string
  /** ユーザー名 */
  user_name: string | null
  /** 本文 */
  body: string
  /** 管理者による投稿かどうか */
  is_administrator_comment: boolean | null
}

/** 一覧取得APIの共通メタ情報 */
export interface DirectusItemsMeta {
  /** フィルター後の件数 */
  filter_count?: number
}

/** 単一アイテムレスポンス型 */
export interface DirectusSingleItemResponse<T> {
  /** データ */
  data: T
}

/** 計算済みAPIのページネーション情報 */
export interface CalculatedApiPagination {
  /** 現在のページ番号 */
  page: number
  /** 1ページあたりの件数 */
  pageSize: number
  /** 合計ページ数 */
  pageCount: number
  /** 合計件数 */
  total: number
}

/** 計算済みAPIのメタ情報 */
export interface CalculatedApiMeta {
  /** ページネーション */
  pagination?: CalculatedApiPagination
}
