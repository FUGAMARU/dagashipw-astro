import { useState } from "react"
import useSWR from "swr"

import { CommonViewContainer } from "@/components/parts/CommonViewContainer"
import { CommentList } from "@/components/templates/list/CommentList"
import styles from "@/components/views/CommentView.module.css"
import { selfHostedFetcher } from "@/services/self-hosted-api"
import { isDefined, isValidArray } from "@/utils"

import type { ArticleInfo, CommentInfo } from "@/types/models"

/** Props */
type Props = Pick<ArticleInfo, "articleUrlId">

/**
 * コメントセクション表示用コンポーネント
 * コメントに関してはページビルド後に更新される可能性がありSSGできないのでAstroファイルではなくクライアントサイドでも動くReactコンポとして実装している
 */
export const CommentView = ({ articleUrlId }: Props) => {
  const [isCommentPostModalOpen, setIsCommentPostModalOpen] = useState(false)

  /** コメント投稿モーダルを開く処理 */
  const handleCommentPostModalOpen = () => {
    setIsCommentPostModalOpen(true)
  }

  /** コメント投稿モーダルを閉じる処理 */
  const handleCommentPostModalClose = () => {
    setIsCommentPostModalOpen(false)
  }

  /** コメントを投稿する時の処理 */
  const handleSubmit = () => {
    console.log("コメントを投稿")
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
      isOpen={isCommentPostModalOpen}
      isReferredFromCommentView
      onClose={handleCommentPostModalClose}
      onOpen={handleCommentPostModalOpen}
      onSubmit={handleSubmit}
      sectionTitleProps={{
        icon: { name: "commentWithPen", coloringMethod: "fill" },
        title: `この記事に寄せられたコメント (${commentInfoList.length})`
      }}
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
