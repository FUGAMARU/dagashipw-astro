import useSWR from "swr"

import { CommonViewContainer } from "@/components/parts/CommonViewContainer"
import { CommentList } from "@/components/templates/CommentList"
import { CommentPostButton } from "@/components/templates/CommentPostButton"
import styles from "@/components/views/CommentView.module.css"
import { selfHostedFetcher } from "@/services/self-hosted-api"
import { isDefined, isValidArray } from "@/utils"

import type { CommentInfo } from "@/types/models"

/** Props */
type Props = {
  /** 記事のURL ID */
  articleUrlId: string
}

/**
 * コメントセクション表示用コンポーネント
 * コメントに関してはページビルド後に更新される可能性がありSSGできないのでAstroファイルではなくクライアントサイドでも動くReactコンポとして実装している
 */
export const CommentView = ({ articleUrlId }: Props) => {
  const { data: commentInfoList } = useSWR<Array<CommentInfo>>(
    `/proxy/comments/${articleUrlId}`,
    selfHostedFetcher
  )

  if (!isDefined(commentInfoList)) {
    return null
  }

  return (
    <CommonViewContainer
      icon={{ name: "commentWithPen", coloringMethod: "fill" }}
      rightTopElement={<CommentPostButton />}
      title={`この記事に寄せられたコメント (${commentInfoList.length})`}
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
