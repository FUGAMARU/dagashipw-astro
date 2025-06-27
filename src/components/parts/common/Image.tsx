import clsx from "clsx"
import { capitalize } from "es-toolkit"

import styles from "@/components/parts/common/Image.module.css"
import { ImageCaption } from "@/components/parts/ImageCaption"
import { RESPONSIVE_SP_MAX_WIDTH } from "@/constants/value"
import { isValidString } from "@/utils"

import type { ImageSizeType, ImageSources } from "@/types/image"
import type { ComponentProps } from "react"

/** Props */
type Props = Omit<ComponentProps<"img">, "className" | "loading" | "src" | "srcSet"> &
  Partial<ComponentProps<typeof ImageCaption>> & {
    /** 画像のURLセット */
    sources: ImageSources
    /** 使用する画像サイズ */
    imageSize: ImageSizeType
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
  sources,
  imageSize,
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
  const selectedSources = sources[imageSize]

  return (
    <figure
      className={clsx(
        styles.imageComponent,
        isValidString(align) && styles[`Align${capitalize(align)}`],
        figureTagClassName
      )}
    >
      <picture>
        {/* SP表示 */}
        <source
          media={`(max-width: ${RESPONSIVE_SP_MAX_WIDTH}px)`}
          srcSet={`${selectedSources.sp1x} 1x, ${selectedSources.sp2x} 2x`}
        />
        {/* PC表示 */}
        <source
          media={`(min-width: ${RESPONSIVE_SP_MAX_WIDTH + 1}px)`}
          srcSet={`${selectedSources.pc1x} 1x, ${selectedSources.pc2x} 2x`}
        />
        {/* フォールバック */}
        <img
          // TODO: 画像押下の場合は画像拡大モーダルを開くようにするかどうか要検討
          className={clsx(
            styles.imgTag,
            isObjectFitCover && styles.Covered,
            isCircle && styles.Circle,
            isValidString(cssWidth) && styles[`Width${capitalize(cssWidth)}`],
            isValidString(cssHeight) && styles[`Height${capitalize(cssHeight)}`],
            isMaxHeight100 && styles.MaxHeight100,
            isWide && styles.Wide,
            isValidString(borderRadius) && styles[`BorderRadius${borderRadius}`]
          )}
          loading={isEager ? "eager" : "lazy"}
          src={selectedSources.pc1x}
          {...props}
        />
      </picture>

      {isValidString(caption) && !isHeightAdjustedImage && <ImageCaption caption={caption} />}
    </figure>
  )
}
