import clsx from "clsx"
import { capitalize } from "es-toolkit"

import styles from "@/components/article/originals/ChatMessage.module.css"
import { Image } from "@/components/parts/common/Image"
import { isDefined } from "@/utils"

/** Props */
type Props = {
  /** 発言者の役割 */
  role: "me" | "opponent"
  /** アイコン */
  icon: string
  /** 名前 */
  name?: string
  /** テキスト */
  text: string
  /** テキストを横いっぱいに広げるかどうか */
  isFullWidth?: boolean
}

/** 吹き出し付きのチャット風メッセージコンポーネント */
export const ChatMessage = ({ role, icon, name, text, isFullWidth = false }: Props) => {
  return (
    <div className={clsx(styles.chatMessage, styles[capitalize(role)])}>
      <Image
        figureTagClassName={styles.icon}
        height={40}
        isCircle
        objectFitCover
        src={icon}
        width={40}
      />

      <div className={clsx(styles.message, isFullWidth && styles.FullWidth)}>
        {isDefined(name) && (
          <span className={clsx(styles.name, styles[capitalize(role)])}>{name}</span>
        )}

        <div className={clsx(styles.bubble, styles[capitalize(role)])}>
          <p className={styles.text}>{text}</p>
        </div>
      </div>
    </div>
  )
}
