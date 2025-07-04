import clsx from "clsx"

import styles from "@/components/article/originals/image/HeightAdjustedImage.module.css"
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

/** PC表示の時に縦長だったり正方形だったりする画像の高さを見やすくして表示するためのコンポーネント */
export const HeightAdjustedImage = async ({ caption, ...imageProps }: Props) => {
  const imageSources = await generateImageSources(imageProps.src ?? "")

  return (
    <figure className={styles.heightAdjustedImage}>
      <Image
        cssHeight="full"
        figureTagClassName={clsx(styles.figure, styles.height100)}
        imageSize="normal"
        pictureTagClassName={styles.height100}
        sources={imageSources}
      />

      {isValidString(caption) && <ImageCaption caption={caption} />}
    </figure>
  )
}
