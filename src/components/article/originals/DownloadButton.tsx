import styles from "@/components/article/originals/DownloadButton.module.css"
import { SvgLoader } from "@/components/parts/svg/SvgLoader"

/** Props */
type Props = {
  /** ファイルURL */
  url: string
}

/** ファイルダウンロードボタン */
export const DownloadButton = ({ url }: Props) => {
  return (
    <a className={styles.downloadButton} href={url}>
      <div className={styles.texts}>
        <span className={styles.top}>Download</span>
        <span className={styles.bottom}>ダウンロード</span>
      </div>

      <SvgLoader className={styles.icon} name="download" />
    </a>
  )
}
