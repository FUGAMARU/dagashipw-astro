import { Fragment, type ReactNode } from "react"

import ArticleCard from "@/components/parts/card/ArticleCard"
import DividerHorizontal from "@/components/parts/common/DividerHorizontal"
import Link from "@/components/parts/common/Link"
import styles from "@/components/templates/ArticleCardList.module.css"

import type { ArticleInfo } from "@/types/article"

type Props = {
  /** 記事情報リスト */
  articleInfoList: Array<ArticleInfo>
}

/**
 * 記事情報カードリスト (トップページで使う)
 * NOTICE: 本来ならトップページのAstroコンポーネントからデーターをmapで回してリストを描写すれば良いのだが、カードをaタグでラップした時にスタイルが崩れる原因不明のバグがあった。
 * そのため、リストをReactコンポーネントとして切り出し、clientディレクティブを付与することによって問題を回避している。
 * TODO: Astroのバグの可能性があるので将来的に修正されているかもしれない。
 * @returns ReactNode
 */
const ArticleCardList = ({ articleInfoList }: Props): ReactNode => {
  return (
    <div className={styles.articleCardList}>
      {articleInfoList.map((articleInfo, index) => (
        <Fragment key={articleInfo.articleUrlId}>
          <Link href={`/${articleInfo.articleUrlId}`}>
            <ArticleCard {...articleInfo} />
          </Link>
          {index !== articleInfoList.length - 1 && <DividerHorizontal />}
        </Fragment>
      ))}
    </div>
  )
}

export default ArticleCardList
