/**
 * @file APIレスポンス関連の型
 */

import type { components, paths } from "@/types/schema"

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
