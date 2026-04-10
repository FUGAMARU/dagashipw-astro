import clsx from "clsx"

import styles from "@/components/article/originals/media/HeightAdjustedImage.module.css"
import { Image } from "@/components/parts/common/Image"
import { ImageCaption } from "@/components/parts/ImageCaption"
import { isValidString } from "@/utils"
import { generateImageSources } from "@/utils/image"

import type { ComponentProps } from "react"

/** Props */
type Props = Omit<
  ComponentProps<typeof Image>,
  "isHeightAdjustedImage" | "caption" | "sources" | "imageSize"
> &
  Partial<Pick<ComponentProps<typeof Image>, "caption">> &
  Pick<ComponentProps<"img">, "src">

/**
 * PC表示の時に縦長だったり正方形だったりする画像の高さを見やすくして表示するためのコンポーネント
 * 16:9の比率で画像の表示エリアの上限まで横幅を引き伸ばした時の高さを、このコンポーネントで表示する画像の高さの上限とする
 */
export const HeightAdjustedImage = ({ caption, ...imageProps }: Props) => {
  const imageSources = generateImageSources(imageProps.src ?? "")

  return (
    <div className={clsx(styles.heightAdjustedImage, isValidString(caption) && styles.HasCaption)}>
      <Image
        cssHeight="full"
        imageSize="normal"
        isContain
        rootTagClassName={styles.figure}
        sources={imageSources}
      />

      {isValidString(caption) && (
        <div className={styles.caption}>
          <ImageCaption caption={caption} />
        </div>
      )}
    </div>
  )
}
