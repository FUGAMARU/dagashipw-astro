import styles from "@/components/article/originals/media/HeightAdjustedVideo.module.css"

import type { ComponentProps } from "react"

/** Props */
type Props = Pick<ComponentProps<"video">, "src">

/**
 * 縦長動画だったり正方形動画だったりする場合に高さを見やすくして表示するためのコンポーネント
 * 16:9の比率で動画の表示エリアの上限まで横幅を引き伸ばした時の高さを、このコンポーネントで表示する動画の高さの上限とする
 */
export const HeightAdjustedVideo = ({ src }: Props) => {
  return (
    <div className={styles.heightAdjustedVideo}>
      <video className={styles.video} controls src={src} />
    </div>
  )
}
