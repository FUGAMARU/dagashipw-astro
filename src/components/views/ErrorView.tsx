import clsx from "clsx"

import { pickSadEmoji } from "@/components/views/ErrorView.helpers"
import styles from "@/components/views/ErrorView.module.css"

/** エラーページ用のProps */
type ErrorPage = {
  /** エラーコード */
  errorCode: number
  /** 英語のエラーメッセージ */
  englishMessage: string
  /** 日本語のエラーメッセージ */
  japaneseMessage: string
}

/** 空ページ用のProps */
type EmptyPage = {
  /** 日本語のエラーメッセージ */
  japaneseMessage: string
}

/** Props */
type Props = ErrorPage | EmptyPage

/** エラー表示用ビュー */
export const ErrorView = (props: Props) => {
  const { japaneseMessage } = props
  const isErrorPage = "errorCode" in props && "englishMessage" in props

  return (
    <div className={styles.errorView}>
      {isErrorPage && <h1 className={styles.code}>{props.errorCode}</h1>}
      {isErrorPage && <span className={styles.english}>{props.englishMessage}</span>}
      <span
        className={clsx(styles.japanese, !isErrorPage && styles.EmptyPage)}
      >{`${japaneseMessage}${pickSadEmoji()}`}</span>
    </div>
  )
}
