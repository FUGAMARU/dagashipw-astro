import styles from "@/components/article/standards/media/Video.module.css"

import type { ComponentProps } from "react"

/** Videoタグコンポーネント */
export const Video = ({ src }: ComponentProps<"video">) => {
  return <video className={styles.videoTag} controls src={src} />
}
