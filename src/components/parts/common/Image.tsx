import clsx from "clsx"

import styles from "@/components/parts/common/Image.module.css"
import { ImageCaption } from "@/components/parts/ImageCaption"
import { isDefined } from "@/utils/isDefined"

import type { ComponentProps } from "react"

/** Props */
type Props = Omit<ComponentProps<"img">, "className"> &
  Partial<ComponentProps<typeof ImageCaption>> & {
    /** object-fir: cover指定かどうか */
    objectFitCover?: boolean
    /** figureタグに充てるclassName */
    figureClassName?: string
    /** imgタグに充てるclassName */
    imgClassName?: string
    /** HeightAdjustedImageコンポーネントからの呼び出しかどうか */
    isHeightAdjustedImage?: boolean
  }

/** 画像コンポーネント */
export const Image = ({
  objectFitCover = false,
  src,
  figureClassName,
  imgClassName,
  caption,
  captionLinkTexts,
  captionLinks,
  isHeightAdjustedImage = false,
  ...props
}: Props) => {
  if (!isDefined(src)) {
    return <span>NoImage</span>
  }

  return (
    <figure className={clsx(styles.imageTag, figureClassName)}>
      <img
        // TODO: 画像押下の場合は画像拡大モーダルを開くようにするかどうか要検討
        className={clsx(styles.image, objectFitCover && styles.Covered, imgClassName)}
        src={src}
        {...props}
      />

      {isDefined(caption) && !isHeightAdjustedImage && (
        <ImageCaption
          caption={caption}
          captionLinks={captionLinks}
          captionLinkTexts={captionLinkTexts}
        />
      )}
    </figure>
  )
}
