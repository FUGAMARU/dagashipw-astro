import styles from "@/components/article/originals/image/HeightAdjustedImage.module.css"
import { Image } from "@/components/parts/common/Image"
import { ImageCaption } from "@/components/parts/ImageCaption"
import { isValidString } from "@/utils"

import type { ComponentProps } from "react"

/** Props */
type Props = Omit<ComponentProps<typeof Image>, "isHeightAdjustedImage" | "caption"> &
  Partial<Pick<ComponentProps<typeof Image>, "caption">>

/** PC表示の時に縦長だったり正方形だったりする画像の高さを見やすくして表示するためのコンポーネント */
export const HeightAdjustedImage = ({
  caption,
  captionLinkTexts,
  captionLinks,
  ...imageProps
}: Props) => {
  return (
    <figure>
      <div className={styles.heightAdjustedImage}>
        <Image isHeightAdjustedImage isMaxHeight100 {...imageProps} />
      </div>

      {isValidString(caption) && (
        <ImageCaption
          caption={caption}
          captionLinks={captionLinks}
          captionLinkTexts={captionLinkTexts}
        />
      )}
    </figure>
  )
}
