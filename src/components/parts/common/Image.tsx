import clsx from "clsx"

import styles from "@/components/parts/common/Image.module.css"
import { ImageCaption } from "@/components/parts/ImageCaption"
import { capitalizeFirstLetter } from "@/utils/formatter"
import { isDefined } from "@/utils/isDefined"

import type { ComponentProps } from "react"

/** Props */
type Props = Omit<ComponentProps<"img">, "className"> &
  Partial<ComponentProps<typeof ImageCaption>> & {
    /** object-fir: cover指定かどうか */
    objectFitCover?: boolean
    /** CSSで指定するwidth */
    cssWidth?: "full" | "auto"
    /** CSSで指定するheight */
    cssHeight?: "full" | "auto"
    /** maxHeightを100%にするかどうか */
    isMaxHeight100?: boolean
    /** アスペクト比を16:9にするかどうか */
    isWide?: boolean
    /** border-radiusの値 */
    borderRadius?: "16" | "0"
    /** figureタグに充てるclassName */
    figureTagClassName?: string
    /** HeightAdjustedImageコンポーネントからの呼び出しかどうか */
    isHeightAdjustedImage?: boolean
  }

/** 画像コンポーネント */
export const Image = ({
  src,
  caption,
  captionLinkTexts,
  captionLinks,
  objectFitCover = false,
  cssWidth,
  cssHeight,
  isMaxHeight100 = false,
  isWide = false,
  borderRadius,
  figureTagClassName,
  isHeightAdjustedImage = false,
  ...props
}: Props) => {
  if (!isDefined(src)) {
    return <span>NoImage</span>
  }

  return (
    <figure className={clsx(styles.imageTag, figureTagClassName)}>
      <img
        // TODO: 画像押下の場合は画像拡大モーダルを開くようにするかどうか要検討
        className={clsx(
          styles.image,
          objectFitCover && styles.Covered,
          isDefined(cssWidth) && styles[`Width${capitalizeFirstLetter(cssWidth)}`],
          isDefined(cssHeight) && styles[`Height${capitalizeFirstLetter(cssHeight)}`],
          isMaxHeight100 && styles.MaxHeight100,
          isWide && styles.Wide,
          isDefined(borderRadius) && styles[`BorderRadius${borderRadius}`]
        )}
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
