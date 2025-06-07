import clsx from "clsx"
import { capitalize } from "es-toolkit"

import styles from "@/components/parts/common/Image.module.css"
import { ImageCaption } from "@/components/parts/ImageCaption"
import { isValidString } from "@/utils"

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
export const Image = ({
  src,
  caption,
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
  return (
    <figure
      className={clsx(
        styles.imageTag,
        isValidString(align) && styles[`Align${capitalize(align)}`],
        figureTagClassName
      )}
    >
      <img
        // TODO: 画像押下の場合は画像拡大モーダルを開くようにするかどうか要検討
        className={clsx(
          styles.image,
          isObjectFitCover && styles.Covered,
          isCircle && styles.Circle,
          isValidString(cssWidth) && styles[`Width${capitalize(cssWidth)}`],
          isValidString(cssHeight) && styles[`Height${capitalize(cssHeight)}`],
          isMaxHeight100 && styles.MaxHeight100,
          isWide && styles.Wide,
          isValidString(borderRadius) && styles[`BorderRadius${borderRadius}`]
        )}
        loading={isEager ? "eager" : "lazy"}
        src={src}
        {...props}
      />

      {isValidString(caption) && !isHeightAdjustedImage && <ImageCaption caption={caption} />}
    </figure>
  )
}
