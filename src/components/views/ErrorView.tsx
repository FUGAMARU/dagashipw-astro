import styles from "@/components/views/ErrorView.module.css"

/** Props */
type Props = {
  /** エラーコード */
  errorCode: number
  /** 英語のエラーメッセージ */
  englishMessage: string
  /** 日本語のエラーメッセージ */
  japaneseMessage: string
}

/** エラー表示用ビュー */
export const ErrorView = ({ errorCode, englishMessage, japaneseMessage }: Props) => {
  return (
    <div className={styles.errorView}>
      <h1 className={styles.code}>{errorCode}</h1>
      <span className={styles.english}>{englishMessage}</span>
      <span className={styles.japanese}>{japaneseMessage}</span>
    </div>
  )
}
