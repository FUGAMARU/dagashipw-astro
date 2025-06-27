/**
 * @file APIレスポンスをフロントエンドで利用する形式に変換する関数群
 */

import { orderBy, pick } from "es-toolkit"

import { FALLBACK_COMMENT_USER_NAME } from "@/constants/value"
import { isValidString } from "@/utils"
import { isDefined } from "@/utils"
import { convertUTCToJST, formatDateToString } from "@/utils/datetime"

import type { Comment } from "@/types/api"
import type { CommentInfo, IntermediateCommentInfo } from "@/types/models"

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
