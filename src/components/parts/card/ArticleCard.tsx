import Image from "@/components/article/standards/Image"
import styles from "@/components/parts/card/ArticleCard.module.css"
import Link from "@/components/parts/common/Link"
import SvgLoader from "@/components/parts/svg/SvgLoader"
import Tag from "@/components/parts/Tag"
import ArticleInfo from "@/components/templates/ArticleInfo"

import type { ReactNode } from "react"

type Props = {
  /** サムネイル */
  thumbnail: string
  /** 作成日 */
  createdAt: string
  /** 更新日 */
  updatedAt?: string
  /** コメント数 */
  commentCount: number
  /** 記事タイトル */
  title: string
  /** 記事本文 */
  body: string
  /** タグ */
  tags: Array<string>
  /** 記事URL ID */
  articleUrlId: string
}

/**
 * 記事情報カード (トップページで使う)
 * @returns ReactNode
 */
const ArticleCard = ({
  thumbnail,
  createdAt,
  updatedAt,
  commentCount,
  title,
  body,
  tags,
  articleUrlId
}: Props): ReactNode => {
  return (
    <div className={styles.articleCard}>
      <Image className={styles.thumbnailImage} objectFitCover src={thumbnail} />

      <div className={styles.main}>
        <div className={styles.header}>
          <ArticleInfo
            commentCount={commentCount}
            createdAt={createdAt}
            isBorderHidden
            updatedAt={updatedAt}
          />
        </div>

        <div className={styles.details}>
          <span className={styles.title}>{title}</span>
          <span className={styles.body}>{body}</span>
          <div className={styles.tags}>
            {tags.map(tagText => (
              <Tag key={tagText} href={`/tags/${tagText}`} text={tagText} />
            ))}
          </div>
        </div>

        <div className={styles.link}>
          <Link href={`/${articleUrlId}`}>
            <div className={styles.readIt}>
              <SvgLoader height={18} name="doubleRightArrow" width={18} />
              <span className={styles.text}>読んでみる</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ArticleCard
