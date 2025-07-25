import { isAxiosError } from "axios"
import { useState } from "react"
import useSWR from "swr"

import { COMMENT_ELEMENT_ID_PREFIX } from "@/constants/element"
import { postComment, selfHostedFetcher } from "@/services/self-hosted-api"
import { isDefined, isValidString } from "@/utils"

import type { CalculatedComment, PostCommentErrorResponse } from "@/types/api"
import type { ChangeEvent, FormEvent } from "react"

/** 返り値 */
type UseCommentView = {
  /** コメント一覧 */
  commentInfoList: Array<CalculatedComment> | undefined
  /** コメント投稿モーダルが開いているかどうか */
  isCommentPostModalOpen: boolean
  /** ニックネーム欄の値 */
  userNameValue: string
  /** コメント欄の値 */
  bodyValue: string
  /** ニックネーム欄のエラーメッセージ */
  userNameErrorMessage?: string
  /** コメント欄のエラーメッセージ */
  bodyErrorMessage?: string
  /** バリデーション以外のエラーメッセージ */
  errorMessage?: string
  /** コメント投稿モーダルを開く処理 */
  handleCommentPostModalOpen: () => void
  /** コメント投稿モーダルを閉じる処理 */
  handleCommentPostModalClose: () => void
  /** コメント欄の値が変更された時の処理 */
  handleBodyChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  /** ニックネーム欄の値が変更された時の処理 */
  handleUserNameChange: (e: ChangeEvent<HTMLInputElement>) => void
  /** コメントを投稿する時の処理 */
  handleSubmit: (
    e: FormEvent<HTMLFormElement>,
    turnstileToken: string,
    parentCommentDocumentId?: string
  ) => Promise<void>
  /** コメント投稿中かどうか */
  isCommentPosting: boolean
}

/**
 * CommentViewコンポーネントの処理をカスタムフックスとして切り出したもの
 *
 * @param articleUrlId - 記事のURL ID
 * @returns CommentViewコンポーネントの処理
 */
export const useCommentView = (articleUrlId: string): UseCommentView => {
  const { data: commentInfoList } = useSWR<Array<CalculatedComment>>(
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
  /** ニックネーム欄のエラーメッセージ */
  const [userNameErrorMessage, setUserNameErrorMessage] = useState<string>()
  /** コメント欄のエラーメッセージ */
  const [bodyErrorMessage, setBodyErrorMessage] = useState<string>()
  /** バリデーション以外のエラーメッセージ */
  const [errorMessage, setErrorMessage] = useState<string>()
  /** コメントの投稿処理中かどうか */
  const [isCommentPosting, setIsCommentPosting] = useState(false)

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
   * @param turnstileToken - Cloudflare Turnstileのトークン
   * @param parentCommentDocumentId - 親コメントのドキュメントID (返信コメントの場合)
   */
  const handleSubmit = async (
    e: FormEvent,
    turnstileToken: string,
    parentCommentDocumentId?: string
  ): Promise<void> => {
    e.preventDefault()

    try {
      setUserNameErrorMessage(undefined)
      setBodyErrorMessage(undefined)
      setIsCommentPosting(true)

      const { data: createdCommentDocumentId } = await postComment(
        articleUrlId,
        bodyValue,
        turnstileToken,
        isValidString(userNameValue) ? userNameValue : undefined,
        parentCommentDocumentId
      )

      location.href = `${location.pathname}#${COMMENT_ELEMENT_ID_PREFIX}${createdCommentDocumentId}` // 投稿したコメントの位置まで自動スクロールためのハッシュを追加
      location.reload() // リロード
    } catch (e) {
      if (!isAxiosError(e)) {
        throw e
      }

      const errorResponse = e.response?.data as PostCommentErrorResponse | undefined

      if (!isDefined(errorResponse)) {
        throw e
      }

      setUserNameErrorMessage(errorResponse.userNameErrorMessage)
      setBodyErrorMessage(errorResponse.bodyErrorMessage)
      setErrorMessage(errorResponse.errorMessage)
      setIsCommentPosting(false)
    }

    // ページリロードまでスピナー表示にしておきたいのでfinallyは使わず、例外発生時のみスピナー表示を解除する。
  }

  return {
    commentInfoList,
    userNameValue,
    bodyValue,
    userNameErrorMessage,
    bodyErrorMessage,
    errorMessage,
    handleBodyChange,
    handleCommentPostModalClose,
    handleCommentPostModalOpen,
    handleSubmit,
    handleUserNameChange,
    isCommentPostModalOpen,
    isCommentPosting
  } as const
}
