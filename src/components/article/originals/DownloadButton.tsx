import styles from "@/components/article/originals/DownloadButton.module.css"
import { Link } from "@/components/parts/common/Link"
import { SvgLoader } from "@/components/parts/svg/SvgLoader"

/** Props */
type Props = {
  /** ファイルURL */
  url: string
}

/** ファイルダウンロードボタン */
export const DownloadButton = ({ url }: Props) => {
  return (
    <Link className={styles.downloadButton} href={url}>
      <div className={styles.texts}>
        <span className={styles.top}>Download</span>
        <span className={styles.bottom}>ダウンロード</span>
      </div>

      <SvgLoader className={styles.icon} name="download" />
    </Link>
  )
}
