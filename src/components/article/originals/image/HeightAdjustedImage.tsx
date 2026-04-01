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
    <div className={clsx(styles.heightAdjustedImage, isValidString(caption) && styles.HasCaption)}>
      <Image
        cssHeight="full"
        imageSize="normal"
        isContain
        rootTagClassName={clsx(styles.figure, styles.height100, styles.pictureTag)}
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
