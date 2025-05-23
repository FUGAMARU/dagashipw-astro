import { useState, type ChangeEvent, type FormEvent } from "react"
import useSWR from "swr"

import { COMMENT_ELEMENT_ID_PREFIX } from "@/constants/element"
import { postComment, selfHostedFetcher } from "@/services/self-hosted-api"
import { isValidString } from "@/utils"

import type { CommentInfo } from "@/types/models"

/** 返り値 */
type UseCommentView = {
  /** コメント一覧 */
  commentInfoList: Array<CommentInfo> | undefined
  /** コメント投稿モーダルが開いているかどうか */
  isCommentPostModalOpen: boolean
  /** コメント欄の値 */
  bodyValue: string
  /** ニックネーム欄の値 */
  userNameValue: string
  /** コメント投稿モーダルを開く処理 */
  handleCommentPostModalOpen: () => void
  /** コメント投稿モーダルを閉じる処理 */
  handleCommentPostModalClose: () => void
  /** コメント欄の値が変更された時の処理 */
  handleBodyChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  /** ニックネーム欄の値が変更された時の処理 */
  handleUserNameChange: (e: ChangeEvent<HTMLInputElement>) => void
  /** コメントを投稿する時の処理 */
  handleSubmit: (e: FormEvent) => Promise<void>
}

/**
 * CommentViewコンポーネントの処理をカスタムフックスとして切り出したもの
 *
 * @param articleUrlId - 記事のURL ID
 * @returns CommentViewコンポーネントの処理
 */
export const useCommentView = (articleUrlId: string): UseCommentView => {
  const { data: commentInfoList } = useSWR<Array<CommentInfo>>(
    {
      apiFunction: "getArticleCommentInfoList",
      arg: articleUrlId
    },
    selfHostedFetcher
  )

  /** コメント投稿モーダルが開いているかどうか */
  const [isCommentPostModalOpen, setIsCommentPostModalOpen] = useState(false)
  /** ニックネーム欄の値 */
  const [userNameValue, setUserNameValue] = useState("")
  /** コメント欄の値 */
  const [bodyValue, setBodyValue] = useState("")

  /**
   * コメント投稿モーダルのニックネーム欄の値が変更された時の処理
   *
   * @param e - イベント
   */
  const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserNameValue(e.target.value)
  }

  /**
   * コメント投稿モーダルのコメント欄の値が変更された時の処理
   *
   * @param e - イベント
   */
  const handleBodyChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setBodyValue(e.target.value)
  }

  /** コメント投稿モーダルを開く処理 */
  const handleCommentPostModalOpen = (): void => {
    setIsCommentPostModalOpen(true)
  }

  /** コメント投稿モーダルを閉じる処理 */
  const handleCommentPostModalClose = (): void => {
    setIsCommentPostModalOpen(false)
  }

  /**
   * コメントを投稿する時の処理
   *
   * @param e - イベント
   */
  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault()

    const { data: createdCommentDocumentId } = await postComment(
      articleUrlId,
      bodyValue,
      isValidString(userNameValue) ? userNameValue : undefined
    )

    location.href = `${window.location.pathname}#${COMMENT_ELEMENT_ID_PREFIX}${createdCommentDocumentId}` // 投稿したコメントの位置まで自動スクロールためのハッシュを追加
    location.reload() // リロード
  }

  return {
    commentInfoList,
    bodyValue,
    handleBodyChange,
    handleCommentPostModalClose,
    handleCommentPostModalOpen,
    handleSubmit,
    handleUserNameChange,
    isCommentPostModalOpen,
    userNameValue
  } as const
}
