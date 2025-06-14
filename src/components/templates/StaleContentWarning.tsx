import { SvgLoader } from "@/components/parts/svg/SvgLoader"
import { getElapsedYearsSincePublication } from "@/components/templates/StaleContentWarning.helpers"
import styles from "@/components/templates/StaleContentWarning.module.css"

/** Props */
type Props = {
  /** 記事の投稿（更新）日時 */
  articleDate: Date
}

/** 古い記事に警告を表示するためのコンポーネント */
export const StaleContentWarning = ({ articleDate }: Props) => {
  const elapsedYears = getElapsedYearsSincePublication(articleDate)

  if (elapsedYears < 1) {
    return null
  }

  return (
    <div className={styles.staleContentWarning}>
      <div className={styles.main}>
        <SvgLoader className={styles.icon} name="warning" />

        <span className={styles.text}>
          この記事は最終更新から<span className={styles.years}>{elapsedYears}</span>
          年以上経過しているため、内容が古くなっている可能性があります。
        </span>
      </div>
    </div>
  )
}
