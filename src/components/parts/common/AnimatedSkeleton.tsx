import styles from "@/components/parts/common/AnimatedSkeleton.module.css"

/** Props */
type Props = {
  /** 横幅 */
  width?: number
  /** 高さ */
  height?: number
}

/** アニメーション付きのスケルトンUI */
export const AnimatedSkeleton = ({ width, height }: Props) => {
  return (
    <div
      className={styles.animatedSkeleton}
      style={{
        width,
        height
      }}
    />
  )
}
