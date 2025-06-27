/**
 * @file APIレスポンスをフロントエンドで利用する形式に変換する関数群
 */

import { orderBy, pick } from "es-toolkit"

import { API_ORIGIN } from "@/constants/env"
import { FALLBACK_COMMENT_USER_NAME, FALLBACK_THEME_COLOR } from "@/constants/value"
import { getArticleBackNumbersBatch } from "@/services/api"
import { isValidString } from "@/utils"
import { isDefined } from "@/utils"
import { convertUTCToJST, formatDateToString } from "@/utils/datetime"
import { generateImageSources } from "@/utils/image"
import { extractBeginningParagraph } from "@/utils/markdown"

import type { Article, Comment } from "@/types/api"
import type { ArticleInfo, CommentInfo, IntermediateCommentInfo } from "@/types/models"

/**
 * 複数のCMSから取得した記事情報をフロントエンドで利用する形式に一括変換する
 *
 * @param articles - 記事情報の配列
 * @returns 整形された記事情報の配列
 */
export const transformDataToArticleInfoBatch = async (
  articles: Array<Article>
): Promise<Array<ArticleInfo>> => {
  if (articles.length === 0) {
    return []
  }

  const articleUrlIds = articles.map(article => article.articleUrlId)

  const backNumbersMap = await getArticleBackNumbersBatch(articleUrlIds)

  const transformPromises = articles.map(async article => {
    const backNumber = backNumbersMap.get(article.articleUrlId) ?? 0
    const lightweightThumbnailUrl = await generateImageSources(
      `${API_ORIGIN}${article.thumbnail.url}`
    )

    const baseData = {
      articleUrlId: article.articleUrlId,
      backNumber,
      title: article.title,
      thumbnail: lightweightThumbnailUrl,
      themeColor: article.themeColor ?? FALLBACK_THEME_COLOR,
      tags: (article.tags as Array<string>) ?? [],
      bodyBeginningParagraph: extractBeginningParagraph(article.body)
    } as const satisfies Partial<ArticleInfo>

    const createdAt = formatDateToString(new Date(article.forceCreatedAt), "yyyy/MM/dd")

    // 記事更新日はforceUpdatedAtだけを使用する
    const updatedAt = article.forceUpdatedAt

    return {
      ...baseData,
      createdAt,
      updatedAt: isDefined(updatedAt)
        ? formatDateToString(new Date(updatedAt), "yyyy/MM/dd")
        : undefined
    }
  })

  return Promise.all(transformPromises)
}

/**
 * CMSから取得したコメントデーターをフロントエンドで利用する形式に変換する
 *
 * @param comments - コメントデーター
 * @returns 整形されたコメントデーター
 */
export const transformDataToCommentInfo = (comments: Array<Comment>): Array<CommentInfo> => {
  /** CMSからレスポンスされたデーターのうち使用するプロパティーだけピックアップしたもの */
  const propertyPickedData = comments.map(comment =>
    pick(comment, [
      "documentId",
      "userName",
      "parentCommentDocumentId",
      "body",
      "forceCreatedAt",
      "createdAt",
      "isAdministratorComment"
    ])
  )

  /** データを変換したもの */
  const transformedData = propertyPickedData.map(comment => {
    if (!isDefined(comment.documentId)) {
      throw new Error("コメントIDが存在しません")
    }

    if (!isValidString(comment.forceCreatedAt)) {
      throw new Error("コメントのforceCreatedAtが存在しません")
    }

    return {
      documentId: String(comment.documentId),
      userName: isValidString(comment.userName) ? comment.userName : FALLBACK_COMMENT_USER_NAME,
      parentCommentDocumentId: comment.parentCommentDocumentId,
      body: comment.body,
      submittedAt: formatDateToString(
        convertUTCToJST(new Date(comment.forceCreatedAt)), // createdAtはStrapiがJSTを入れてしまうため利用しない。forceCreatedAtのみをコメント投稿日時の値として利用する。
        "yyyy/MM/dd HH:mm:ss"
      ),
      isAdministratorComment: comment.isAdministratorComment
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
    ...pick(comment, ["userName", "submittedAt", "body", "isAdministratorComment"]),
    commentId: comment.documentId,
    replies: comment.replies.map(reply => ({
      ...pick(reply, ["userName", "submittedAt", "body", "isAdministratorComment"]),
      commentId: reply.documentId
    }))
  }))
}
