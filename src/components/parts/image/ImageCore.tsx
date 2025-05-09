import clsx from "clsx"
import { capitalize } from "es-toolkit"

import { getLightweightImageUrl } from "@/components/parts/image/ImageCore.helpers"
import styles from "@/components/parts/image/ImageCore.module.css"
import { ImageCaption } from "@/components/parts/ImageCaption"
import { isDefined } from "@/utils"

import type { ComponentProps } from "react"

/** Props */
type Props = Omit<ComponentProps<"img">, "className" | "loading"> &
  Partial<ComponentProps<typeof ImageCaption>> & {
    /** 画像を即時読み込みするかどうか */
    isEager?: boolean
    /** object-fir: cover指定かどうか */
    isObjectFitCover?: boolean
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
export const ImageCore = ({
  src,
  caption,
  captionLinkTexts,
  captionLinks,
  isEager = false,
  isObjectFitCover = false,
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
          isObjectFitCover && styles.Covered,
          isCircle && styles.Circle,
          isDefined(cssWidth) && styles[`Width${capitalize(cssWidth)}`],
          isDefined(cssHeight) && styles[`Height${capitalize(cssHeight)}`],
          isMaxHeight100 && styles.MaxHeight100,
          isWide && styles.Wide,
          isDefined(borderRadius) && styles[`BorderRadius${borderRadius}`]
        )}
        loading={isEager ? "eager" : "lazy"}
        src={getLightweightImageUrl(src)}
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
