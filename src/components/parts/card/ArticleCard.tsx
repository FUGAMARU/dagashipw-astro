import BackNumber from "@/components/parts/BackNumber"
import styles from "@/components/parts/card/ArticleCard.module.css"
import SvgLoader from "@/components/parts/svg/SvgLoader"
import Tag from "@/components/parts/Tag"
import ArticleInfoBar from "@/components/templates/ArticleInfoBar"
import Image from "@/components/templates/Image"

import type { ArticleInfo } from "@/types/article"
import type { ReactNode } from "react"

type Props = ArticleInfo

/**
 * 記事情報カード (トップページで使う)
 * @returns ReactNode
 */
const ArticleCard = ({
  thumbnailUrl,
  createdAt,
  updatedAt,
  commentCount,
  title,
  bodyBeginningParagraph,
  tags,
  backNumber
}: Props): ReactNode => {
  return (
    <div className={styles.articleCard}>
      <Image className={styles.thumbnailImage} noMargin objectFitCover src={thumbnailUrl} />

      <div className={styles.index}>
        <BackNumber backNumber={backNumber} />
      </div>

      <div className={styles.main}>
        <div className={styles.header}>
          <ArticleInfoBar
            commentCount={commentCount}
            createdAt={createdAt}
            isBorderHidden
            updatedAt={updatedAt}
          />
        </div>

        <div className={styles.details}>
          <span className={styles.title}>{title}</span>
          <span className={styles.body}>{bodyBeginningParagraph}</span>
          <div className={styles.tags}>
            {tags.map(tagText => (
              <Tag key={tagText} href={`/tags/${tagText}`} text={tagText} />
            ))}
          </div>
        </div>

        <div className={styles.link}>
          <div className={styles.read}>
            <SvgLoader height={18} name="doubleRightArrow" width={18} />
            <span className={styles.text}>読んでみる</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticleCard
