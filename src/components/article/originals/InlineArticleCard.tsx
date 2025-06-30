import styles from "@/components/article/originals/InlineArticleCard.module.css"
import { Image } from "@/components/parts/common/Image"
import { Link } from "@/components/parts/common/Link"
import { getArticle } from "@/services/api"

/** Props */
type Props = {
  /** 記事のURL ID */
  articleUrlId: string
}

/** 文中で表示する記事カード */
export const InlineArticleCard = async ({ articleUrlId }: Props) => {
  const article = await getArticle(articleUrlId)

  return (
    <Link className={styles.inlineArticleCard} href={`/${articleUrlId}`}>
      <Image
        borderRadius="0"
        cssHeight="full"
        cssWidth="full"
        figureTagClassName={styles.thumbnail}
        height={75}
        imageSize="smaller"
        isObjectFitCover
        sources={article.thumbnail}
        width={133}
      />

      <div className={styles.data}>
        <span className={styles.title}>{article.title}</span>
        <p className={styles.text}>{article.bodyBeginningParagraph}</p>
      </div>
    </Link>
  )
}
