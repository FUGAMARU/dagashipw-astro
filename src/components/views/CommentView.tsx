import { useState, type ChangeEvent } from "react"
import useSWR from "swr"

import { CommonViewContainer } from "@/components/parts/CommonViewContainer"
import { CommentList } from "@/components/templates/list/CommentList"
import styles from "@/components/views/CommentView.module.css"
import { postComment, selfHostedFetcher } from "@/services/self-hosted-api"
import { isDefined, isValidArray, isValidString } from "@/utils"

import type { ArticleInfo, CommentInfo } from "@/types/models"

/** Props */
type Props = Pick<ArticleInfo, "articleUrlId">

/**
 * コメントセクション表示用コンポーネント
 * コメントに関してはページビルド後に更新される可能性がありSSGできないのでAstroファイルではなくクライアントサイドでも動くReactコンポとして実装している
 */
export const CommentView = ({ articleUrlId }: Props) => {
  // TODO: フォーム関係のロジックが肥大化してきているのでフックスに切り出しても良いかも

  /** コメント投稿モーダルが開いているかどうか */
  const [isCommentPostModalOpen, setIsCommentPostModalOpen] = useState(false)
  /** ニックネーム欄の値 */
  const [userNameValue, setUserNameValue] = useState("")
  /** コメント欄の値 */
  const [bodyValue, setBodyValue] = useState("")

  /** コメント投稿モーダルのニックネーム欄の値が変更された時の処理 */
  const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserNameValue(e.target.value)
  }

  /** コメント投稿モーダルのコメント欄の値が変更された時の処理 */
  const handleBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBodyValue(e.target.value)
  }

  /** コメント投稿モーダルを開く処理 */
  const handleCommentPostModalOpen = () => {
    setIsCommentPostModalOpen(true)
  }

  /** コメント投稿モーダルを閉じる処理 */
  const handleCommentPostModalClose = () => {
    setIsCommentPostModalOpen(false)
  }

  /** コメントを投稿する時の処理 */
  const handleSubmit = async () => {
    await postComment(
      articleUrlId,
      bodyValue,
      isValidString(userNameValue) ? userNameValue : undefined
    )
  }

  const { data: commentInfoList } = useSWR<Array<CommentInfo>>(
    {
      apiFunction: "getArticleCommentInfoList",
      arg: articleUrlId
    },
    selfHostedFetcher
  )

  if (!isDefined(commentInfoList)) {
    return null
  }

  return (
    <CommonViewContainer
      bodyValue={bodyValue}
      isOpen={isCommentPostModalOpen}
      isReferredFromCommentView
      onBodyChange={handleBodyChange}
      onClose={handleCommentPostModalClose}
      onOpen={handleCommentPostModalOpen}
      onSubmit={handleSubmit}
      onUserNameChange={handleUserNameChange}
      sectionTitleProps={{
        icon: { name: "commentWithPen", coloringMethod: "fill" },
        title: `この記事に寄せられたコメント (${commentInfoList.length})`
      }}
      userNameValue={userNameValue}
    >
      {isValidArray(commentInfoList) ? (
        <CommentList comments={commentInfoList} />
      ) : (
        <span className={styles.commentEmpty}>
          まだコメントされていません。コメントしてみませんか？
        </span>
      )}
    </CommonViewContainer>
  )
}
