import useSWR from "swr"

import { SvgLoader } from "@/components/parts/svg/SvgLoader"
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
    <div className={styles.commentView}>
      <div className={styles.header}>
        <div className={styles.left}>
          <SvgLoader height={20} name="commentWithPen" width={20} />
          <span
            className={styles.text}
          >{`この記事に寄せられたコメント (${commentInfoList.length})`}</span>
        </div>
        <CommentPostButton />
      </div>

      {isValidArray(commentInfoList) ? (
        <CommentList comments={commentInfoList} />
      ) : (
        <span className={styles.empty}>まだコメントされていません。コメントしてみませんか？</span>
      )}
    </div>
  )
}
