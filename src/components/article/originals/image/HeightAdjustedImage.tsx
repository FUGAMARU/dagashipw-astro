import { memo } from "react"

import styles from "@/components/article/originals/image/HeightAdjustedImage.module.css"
import { ImageCore } from "@/components/parts/image/ImageCore"
import { ImageCaption } from "@/components/parts/ImageCaption"
import { isDefined } from "@/utils"

import type { ComponentProps } from "react"

/** Props */
type Props = Omit<ComponentProps<typeof ImageCore>, "isHeightAdjustedImage" | "caption"> &
  Partial<Pick<ComponentProps<typeof ImageCore>, "caption">>

/** PC表示の時に縦長だったり正方形だったりする画像の高さを見やすくして表示するためのコンポーネント */
export const HeightAdjustedImage = memo(
  ({ caption, captionLinkTexts, captionLinks, ...imageProps }: Props) => {
    return (
      <figure>
        <div className={styles.heightAdjustedImage}>
          <ImageCore isHeightAdjustedImage isMaxHeight100 {...imageProps} />
        </div>

        {isDefined(caption) && (
          <ImageCaption
            caption={caption}
            captionLinks={captionLinks}
            captionLinkTexts={captionLinkTexts}
          />
        )}
      </figure>
    )
  }
)

HeightAdjustedImage.displayName = "HeightAdjustedImage"
