/**
 * @file APIレスポンスをフロントエンドで利用する形式に変換する関数群
 */

import { orderBy } from "es-toolkit"

import { API_ORIGIN } from "@/constants/env"
import {
  EXTRACTED_PARAGRAPHS_LENGTH,
  FALLBACK_COMMENT_USER_NAME,
  FALLBACK_THEME_COLOR
} from "@/constants/value"
import { isValidString } from "@/utils"
import { isDefined } from "@/utils"

import type {
  Article,
  ArticleInfo,
  Comment,
  CommentInfo,
  IntermediateCommentInfo
} from "@/types/models"

/**
 * CMSから取得した記事情報をフロントエンドで利用する形式に変換する
 *
 * @param article - 記事情報
 * @returns 整形された記事情報
 */
export const transformDataToArticleInfo = async (article: Article): Promise<ArticleInfo> => {
  const thumbnailUrl = `${API_ORIGIN}${article.thumbnail.url}`

  /**
   * 記事のMarkdownテキストから冒頭の段落を抽出し、所定の文字数だけ切り取る
   *
   * @param markdown - Markdown
   * @returns 所定の文字数で切り取られた段落
   */
  const extractBeginningParagraph = (markdown: string): string => {
    const paragraphs = markdown
      // Markdownリンクのテキスト部分だけを抽出
      .replace(/\[([^\]]+)]\([^)]+\)/g, "$1")
      // Markdown画像を削除
      .replace(/!\[[^\]]*]\([^)]+\)/g, "")
      // HTMLタグを削除し、タグ内のテキストを保持
      .replace(/<\/?[^>]+(>|$)/g, "")
      // 見出しなどの余計なものを削除
      .replace(/(^|\n)(#+\s|<[^>]+>)/g, "")
      // 改行をスペースに変換
      .replace(/\n+/g, " ")
      // 不要なスペースをトリム
      .trim()

    return paragraphs.substring(0, EXTRACTED_PARAGRAPHS_LENGTH)
  }

  /**
   * 日付文字列をyyyy/MM/dd形式に整形する
   *
   * @param dateString - 日付文字列
   * @returns yyyy/MM/dd
   */
  const formatDateString = (dateString: string): string => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = `0${date.getMonth() + 1}`.slice(-2)
    const day = `0${date.getDate()}`.slice(-2)
    return `${year}/${month}/${day}`
  }

  const baseData = {
    articleUrlId: article.articleUrlId,
    backNumber: 1, // TODO: 実際の値を反映させる必要がある
    title: article.title,
    thumbnailUrl,
    themeColor: article.themeColor ?? FALLBACK_THEME_COLOR,
    tags: (article.tags as Array<string>) ?? [],
    bodyBeginningParagraph: extractBeginningParagraph(article.body),
    commentCount: 1 // TODO: 実際の値を反映させる必要がある
  } as const satisfies Partial<ArticleInfo>

  // 記事作成日はforceCreatedAtが指定されていればその値を優先して使用する
  const createdAtData = article.forceCreatedAt ?? article.createdAt

  if (!isDefined(createdAtData)) {
    throw new Error("記事作成日のデーターが存在しません")
  }

  const createdAt = formatDateString(createdAtData)

  // 記事更新日はforceUpdatedAtだけを使用する
  const updatedAt = article.forceUpdatedAt

  return {
    ...baseData,
    createdAt,
    updatedAt: isDefined(updatedAt) ? formatDateString(updatedAt) : undefined
  }
}

// TODO: isAdministratorCommentへの対応が必要 (コンポ側も)

/**
 * CMSから取得したコメントデーターをフロントエンドで利用する形式に変換する
 *
 * @param comments - コメントデーター
 * @returns 整形されたコメントデーター
 */
export const transformDataToCommentInfo = (comments: Array<Comment>): Array<CommentInfo> => {
  /** CMSからレスポンスされたデーターのうち使用するプロパティーだけピックアップしたもの */
  const propertyPickedData = comments.map(
    comment =>
      ({
        documentId: comment.documentId,
        userName: comment.userName,
        parentCommentDocumentId: comment.parentCommentDocumentId,
        body: comment.body,
        forceCreatedAt: comment.forceCreatedAt,
        createdAt: comment.createdAt
      }) satisfies Partial<Comment>
  )

  /** データを変換したもの */
  const transformedData = propertyPickedData.map(comment => {
    if (!isDefined(comment.documentId)) {
      throw new Error("コメントIDが存在しません")
    }

    // forceCreatedAtが指定されていればその値を優先して使用する
    const submittedAt = comment.forceCreatedAt ?? comment.createdAt

    if (!isDefined(submittedAt)) {
      throw new Error("コメントの投稿日が存在しません")
    }

    return {
      documentId: String(comment.documentId),
      userName: isValidString(comment.userName) ? comment.userName : FALLBACK_COMMENT_USER_NAME,
      parentCommentDocumentId: comment.parentCommentDocumentId,
      body: comment.body,
      submittedAt
    } satisfies Omit<IntermediateCommentInfo, "replies">
  })

  /** 子コメントのデーターを付与したもの */
  const replyAddedData: Array<IntermediateCommentInfo> = transformedData
    .map(comment => ({
      ...comment,
      replies: transformedData.filter(
        reply =>
          reply.parentCommentDocumentId === comment.documentId &&
          reply.documentId !== comment.documentId
      )
    }))
    .filter(comment => !isDefined(comment.parentCommentDocumentId))

  /** 親コメントを投稿日時の降順・子コメントを投稿日時の昇順に並べ替えたもの */
  const sortedData = orderBy(replyAddedData, ["submittedAt"], ["desc"]).map(
    (comment: IntermediateCommentInfo) => ({
      ...comment,
      replies: orderBy(comment.replies, ["submittedAt"], ["asc"])
    })
  )

  return sortedData.map((comment: IntermediateCommentInfo) => ({
    commentId: comment.documentId,
    userName: comment.userName,
    submittedAt: comment.submittedAt,
    body: comment.body,
    replies: comment.replies.map(reply => ({
      commentId: reply.documentId,
      userName: reply.userName,
      submittedAt: reply.submittedAt,
      body: reply.body
    }))
  }))
}
