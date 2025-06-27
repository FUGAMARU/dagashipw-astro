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
      <div className={styles.image}>
        <Image
          imageSize="normal"
          isHeightAdjustedImage
          isMaxHeight100
          sources={imageSources}
          {...imageProps}
        />
      </div>

      {isValidString(caption) && <ImageCaption caption={caption} />}
    </figure>
  )
}
