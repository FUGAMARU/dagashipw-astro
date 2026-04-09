import clsx from "clsx"
import { capitalize } from "es-toolkit"

import { createSourceSet } from "@/components/parts/common/Image.helpers"
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
    /** object-fit: contain指定かどうか */
    isContain?: boolean
    /** 円形画像かどうか */
    isCircle?: boolean
    /** CSSで指定するwidth */
    cssWidth?: "full"
    /** CSSで指定するheight */
    cssHeight?: "full" | "auto"
    /** アスペクト比を16:9にするかどうか */
    isWide?: boolean
    /** border-radiusの値 */
    borderRadius?: "16" | "0"
    /** align */
    align?: "start" | "right" | "end"
    /** ルートタグ(pictureタグ)に充てるclassName */
    rootTagClassName?: string
    /** imgタグに充てるclassName */
    imgTagClassName?: string
  }

/** 画像コンポーネント */
export const Image = ({
  sources,
  imageSize,
  caption,
  isEager = false,
  isContain = false,
  isCircle = false,
  cssWidth,
  cssHeight,
  isWide = false,
  borderRadius,
  align = "start",
  rootTagClassName,
  imgTagClassName,
  ...props
}: Props) => {
  const selectedSources = sources[imageSize]

  return (
    <>
      <picture
        className={clsx(
          styles.imageComponent,
          // @ts-expect-error capitalizeによる動的クラスには対応不可能なため
          isValidString(align) && styles[`Align${capitalize(align)}`],
          rootTagClassName
        )}
      >
        {/* SP表示 */}
        <source
          media={`(max-width: ${RESPONSIVE_SP_MAX_WIDTH}px)`}
          srcSet={createSourceSet(selectedSources.sp1x, selectedSources.sp2x)}
        />
        {/* PC表示 */}
        <source
          media={`(min-width: ${RESPONSIVE_SP_MAX_WIDTH + 1}px)`}
          srcSet={createSourceSet(selectedSources.pc1x, selectedSources.pc2x)}
        />
        {/* フォールバック */}
        <img
          // TODO: 画像押下の場合は画像拡大モーダルを開くようにするかどうか要検討
          className={clsx(
            styles.imgTag,
            isContain && styles.Contained,
            isCircle && styles.Circle,
            isValidString(cssWidth) && styles[`Width${capitalize(cssWidth)}`],
            isValidString(cssHeight) && styles[`Height${capitalize(cssHeight)}`],
            isWide && styles.Wide,
            isValidString(borderRadius) && styles[`BorderRadius${borderRadius}`],
            imgTagClassName
          )}
          loading={isEager ? "eager" : "lazy"}
          src={selectedSources.pc1x}
          {...props}
        />
      </picture>

      {isValidString(caption) && (
        <div className={styles.imageCaption}>
          <ImageCaption caption={caption} />
        </div>
      )}
    </>
  )
}
