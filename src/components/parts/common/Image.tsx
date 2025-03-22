import clsx from "clsx"
import { capitalize } from "es-toolkit"

import styles from "@/components/parts/common/Image.module.css"
import { ImageCaption } from "@/components/parts/ImageCaption"
import { isDefined } from "@/utils"

import type { ComponentProps } from "react"

/** Props */
type Props = Omit<ComponentProps<"img">, "className"> &
  Partial<ComponentProps<typeof ImageCaption>> & {
    /** object-fir: cover指定かどうか */
    objectFitCover?: boolean
    /** 円形画像かどうか */
    isCircle?: boolean
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
    /** align */
    align?: "start" | "right" | "end"
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
  isCircle = false,
  cssWidth,
  cssHeight,
  isMaxHeight100 = false,
  isWide = false,
  borderRadius,
  align = "start",
  figureTagClassName,
  isHeightAdjustedImage = false,
  ...props
}: Props) => {
  if (!isDefined(src)) {
    return <span>NoImage</span>
  }

  return (
    <figure
      className={clsx(
        styles.imageTag,
        isDefined(align) && styles[`Align${capitalize(align)}`],
        figureTagClassName
      )}
    >
      <img
        // TODO: 画像押下の場合は画像拡大モーダルを開くようにするかどうか要検討
        className={clsx(
          styles.image,
          objectFitCover && styles.Covered,
          isCircle && styles.Circle,
          isDefined(cssWidth) && styles[`Width${capitalize(cssWidth)}`],
          isDefined(cssHeight) && styles[`Height${capitalize(cssHeight)}`],
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
