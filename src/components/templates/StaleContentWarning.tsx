import { memo, useMemo, type ReactNode } from "react"

import SvgLoader from "@/components/parts/svg/SvgLoader"
import styles from "@/components/templates/StaleContentWarning.module.css"
import { getElapsedYears } from "@/utils/getElapsedYears"

type Props = {
  /** 記事の投稿（更新）日時 */
  articleDate: Date
}

/**
 * 古い記事に警告を表示するためのコンポーネント
 * @returns ReactNode
 */
const StaleContentWarning = ({ articleDate }: Props): ReactNode => {
  const elapsedYears = useMemo(() => getElapsedYears(articleDate), [articleDate])

  if (elapsedYears < 1) {
    return null
  }

  return (
    <div className={styles.staleContentWarning}>
      <div className={styles.main}>
        <SvgLoader height={18} name="warning" width={18} />

        <span className={styles.text}>
          この記事は最終更新から<span className={styles.years}>{elapsedYears}</span>
          年以上経過しているため、内容が古くなっている可能性があります。
        </span>
      </div>
    </div>
  )
}

export default memo(StaleContentWarning)
