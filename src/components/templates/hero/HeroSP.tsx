import BackNumber from "@/components/parts/BackNumber"
import Tag from "@/components/parts/Tag"
import ArticleInfo from "@/components/templates/ArticleInfo"
import styles from "@/components/templates/hero/HeroSP.module.css"

import type { ComponentProps, ReactNode } from "react"

type Props = {
  /** サムネイル */
  thumbnailUrl: string
  /** タイトル */
  title: string
  /** タグ一覧 */
  tags: Array<ComponentProps<typeof Tag>["text"]>
} & ComponentProps<typeof BackNumber> &
  Pick<ComponentProps<typeof ArticleInfo>, "createdAt" | "updatedAt" | "commentCount">

/**
 * ブログ記事先頭に表示するHero
 * @returns ReactNode
 */
const HeroSP = ({
  thumbnailUrl,
  backNumber,
  title,
  createdAt,
  updatedAt,
  commentCount,
  tags
}: Props): ReactNode => {
  return (
    <>
      <div className={styles.imageContainer}>
        <img alt={title} className={styles.thumbnail} src={thumbnailUrl} />
        <div className={styles.overlay} />
        <div className={styles.number}>
          <BackNumber backNumber={backNumber} />
        </div>
      </div>

      <div className={styles.articleDetails}>
        <div className={styles.upper}>
          <ArticleInfo
            commentCount={commentCount}
            createdAt={createdAt}
            isWhiteStyle
            updatedAt={updatedAt}
          />
        </div>

        <h1 className={styles.title}>{title}</h1>

        <div className={styles.tags}>
          {tags.map(tagText => (
            <Tag key={tagText} href={`/tags/${tagText}`} text={tagText} />
          ))}
        </div>
      </div>
    </>
  )
}

export default HeroSP
