import { memo } from "react"

import styles from "@/components/article/originals/image/HeightAdjustedImage.module.css"
import { Image } from "@/components/parts/common/Image"

import type { ComponentProps } from "react"

/** Props */
type Props = ComponentProps<typeof Image>

/** PC表示の時に縦長だったり正方形だったりする画像の高さを見やすくして表示するためのコンポーネント */
export const HeightAdjustedImage = memo((props: Props) => {
  return (
    <figure className={styles.heightAdjustedImage}>
      <Image imgClassName={styles.image} {...props} />
    </figure>
  )
})

HeightAdjustedImage.displayName = "HeightAdjustedImage"
