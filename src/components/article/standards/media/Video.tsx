import styles from "@/components/article/standards/media/Video.module.css"

import type { ReactNode } from "react"

type Props = {
  /** src */
  src: string
}

/**
 * Videoタグコンポーネント
 * @returns Videoタグ
 */
const Video = ({ src }: Props): ReactNode => {
  return <video className={styles.videoTag} controls src={src} />
}

export default Video
